import * as vscode from "vscode";
import { Logger } from "./Logger";
import { BebarExplorer } from "./BebarExplorer";
var util = require("util");
import {BebarController, RefreshContext, RefreshType} from "bebar";
import * as path from "path";
import { loadavg } from "os";
import { BebarEditor } from "./BebarEditor";
import { OutputProvider } from "./OutputProvider";
import { Diagnostic, DiagnosticBag, DiagnosticSeverity } from "bebar";

export function activate(context: vscode.ExtensionContext) {
  const bebarController: BebarController = new BebarController(undefined);

  const explorer = new BebarExplorer(context, bebarController);
  const outputProvider = new OutputProvider(context, bebarController);
  let diagnosticCollection: vscode.DiagnosticCollection = vscode.languages.createDiagnosticCollection('bebar');
  context.subscriptions.push(diagnosticCollection);

  const showProblems = function(){
    diagnosticCollection.clear();

    const sortedDiags: Map<string, vscode.Diagnostic[]> = new Map<string, vscode.Diagnostic[]>();

    for(let i = 0; i < DiagnosticBag.Diagnostics.length; i++) {
      const diagnostic = DiagnosticBag.Diagnostics[i];

      let severity = vscode.DiagnosticSeverity.Error;
      switch(diagnostic.severity){
        case DiagnosticSeverity.Hint:
          severity = vscode.DiagnosticSeverity.Hint;
          case DiagnosticSeverity.Warning:
            severity = vscode.DiagnosticSeverity.Warning;
            case DiagnosticSeverity.info:
              severity = vscode.DiagnosticSeverity.Information;
      }

      const diag: vscode.Diagnostic = new vscode.Diagnostic(
        new vscode.Range(diagnostic.startLine, diagnostic.startColumn, diagnostic.endLine, diagnostic.endColumn),
        diagnostic.message, severity);
      if(!sortedDiags.has(diagnostic.file)) {
        sortedDiags.set(diagnostic.file, [diag]);
      } else {
        sortedDiags.get(diagnostic.file)!.push(diag);
      }
    }

    for(let [file, diags] of sortedDiags) {
      diagnosticCollection.set(vscode.Uri.file(file), diags);
    }
  };

  console.log = function (d) {
    Logger.log(util.format(d));
  };

  console.log('Bebar extension started');

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      const refreshContext = new RefreshContext(
        RefreshType.FileContentChanged,
        bebarController.handlers[0].rootPath,
        event.document.fileName,
        event.document.fileName,
        event.document.getText());
      if (event.contentChanges.length > 0) {
        try {
          if (await bebarController.handlers[0].handleRefresh(refreshContext)) {
              await outputProvider.refresh(refreshContext);
              await explorer.refreshView();
          }
        } catch(e) {
          vscode.window.showErrorMessage((e as any).toString());
        }
        showProblems();
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidCreateFiles(async (event) => {
      for(let i = 0; i < event.files.length; i++) {
        const file = event.files[i];
        const refreshContext = new RefreshContext(
          RefreshType.FileCreated,
          bebarController.handlers[0].rootPath,
          undefined,
          file.fsPath,
          undefined);
        if (await bebarController.handlers[0].handleRefresh(refreshContext)) {
          await outputProvider.refresh(refreshContext);
          showProblems();
          await explorer.refreshView();
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidDeleteFiles(async (event) => {
      for(let i = 0; i < event.files.length; i++) {
        const file = event.files[i];
        const refreshContext = new RefreshContext(
          RefreshType.FileDeleted,
          bebarController.handlers[0].rootPath,
          file.fsPath,
          undefined,
          undefined);
        if (await bebarController.handlers[0].handleRefresh(refreshContext)) {
          await outputProvider.refresh(refreshContext);
          showProblems();
          await explorer.refreshView();
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidRenameFiles(async (event) => {
      for(let i = 0; i < event.files.length; i++) {
        const file = event.files[i];
        const refreshContext = new RefreshContext(
          RefreshType.FileMovedOrRenamed,
          bebarController.handlers[0].rootPath,
          file.oldUri.fsPath,
          file.newUri.fsPath,
          undefined);
        if (await bebarController.handlers[0].handleRefresh(refreshContext)) {
          await outputProvider.refresh(refreshContext);
          showProblems();
          await explorer.refreshView();
        }
      }
    })
  );

	context.subscriptions.push(BebarEditor.register(context));

  vscode.commands.registerCommand("bebar.open", async () => {
    try {
      const dialogResult = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        defaultUri: (vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri : undefined)
      });
      if (dialogResult) {
        const file = dialogResult[0];
        if(file){
          bebarController.handlers = [];
          await bebarController.load(file.fsPath);
          showProblems();
          await explorer.refreshView();
          vscode.commands.executeCommand(
            "setContext",
            "velcomeView:fileOpened",
            true
          );
          vscode.commands.executeCommand("vscode.open", file, {
            viewColumn: 1,
          });
        }
      }
    } catch (e) {
      vscode.window.showErrorMessage((e as any).toString());
    }
  });

  vscode.commands.registerCommand("bebar.run", async () => {
    try {
      await bebarController.writeFiles();
    } catch (e) {
      vscode.window.showErrorMessage((e as any).toString());
    }
  });
}

export function deactivate() {}
