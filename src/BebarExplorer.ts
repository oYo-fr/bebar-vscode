import * as vscode from "vscode";
import {BebarController} from "bebar";
import { OutputsNodeProvider } from "./treenodes/Outputs/OutputsNodeProvider";
import { PartialsNodeProvider } from "./treenodes/Partials/PartialsNodeProvider";
import { HelpersNodeProvider } from "./treenodes/Helpers/HelpersNodeProvider";

export class BebarExplorer {
  private outputsNodeProvider: OutputsNodeProvider;
  private partialsNodeProvider: PartialsNodeProvider;
  private helpersNodeProvider: HelpersNodeProvider;

  constructor(public context: vscode.ExtensionContext, public bebarController: BebarController) {
    vscode.commands.executeCommand(
      "setContext",
      "velcomeView:fileOpened",
      false
    );

    this.outputsNodeProvider = new OutputsNodeProvider(context, bebarController);
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-outputs", {
        treeDataProvider: this.outputsNodeProvider,
      })
    );

    this.partialsNodeProvider = new PartialsNodeProvider(context, bebarController);
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-partials", {
        treeDataProvider: this.partialsNodeProvider,
      })
    );

    this.helpersNodeProvider = new HelpersNodeProvider(context, bebarController);
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-helpers", {
        treeDataProvider: this.helpersNodeProvider,
      })
    );
  }

  async refreshView() {
    await this.partialsNodeProvider.refreshView();
    await this.helpersNodeProvider.refreshView();
  }
}
