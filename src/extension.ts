import * as vscode from "vscode";
import { Logger } from "./Logger";
import { BebarExplorer } from "./BebarExplorer";
var util = require("util");
import {BebarController, RefreshContext, RefreshType} from "bebar";
import * as path from "path";
import { loadavg } from "os";
import { BebarEditor } from "./BebarEditor";
import { OutputProvider } from "./OutputProvider";

export function activate(context: vscode.ExtensionContext) {
  const bebarController: BebarController = new BebarController(undefined);

  const explorer = new BebarExplorer(context, bebarController);
  const outputProvider = new OutputProvider(context, bebarController);

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
        if (await bebarController.handlers[0].handleRefresh(refreshContext)) {
          outputProvider.refresh(refreshContext);
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
      //vscode.window.showErrorMessage(e.toString());
    }
  });

  vscode.commands.registerCommand("bebar.run", async () => {
    try {
      await bebarController.writeFiles();
    } catch (e) {
      //vscode.window.showErrorMessage(e);
    }
  });
}

export function deactivate() {}
