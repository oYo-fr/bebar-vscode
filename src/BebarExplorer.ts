import * as vscode from "vscode";
import {BebarController} from "bebar";
import { PartialsNodeProvider } from "./treenodes/Partials/PartialsNodeProvider";
import { HelpersNodeProvider } from "./treenodes/Helpers/HelpersNodeProvider";

export class BebarExplorer {
  private partialsNodeProvider: PartialsNodeProvider;
  private helpersNodeProvider: HelpersNodeProvider;

  constructor(public context: vscode.ExtensionContext, public bebarController: BebarController) {
    vscode.commands.executeCommand(
      "setContext",
      "velcomeView:fileOpened",
      false
    );

    this.partialsNodeProvider = new PartialsNodeProvider(bebarController);
    context.subscriptions.push(
      vscode.window.createTreeView("bebarExplorer-partials", {
        treeDataProvider: this.partialsNodeProvider,
      })
    );

    this.helpersNodeProvider = new HelpersNodeProvider(bebarController);
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
