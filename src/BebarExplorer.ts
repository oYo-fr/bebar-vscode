import * as vscode from "vscode";
import {BebarController} from "bebar";

export class BebarExplorer {

  constructor(public bebarController: BebarController) {
    vscode.commands.executeCommand(
      "setContext",
      "velcomeView:fileOpened",
      false
    );
  }
}
