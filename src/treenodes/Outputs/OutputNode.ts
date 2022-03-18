import { BebarHandler, Output, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import * as path from "path";
import { BaseNode } from "../BaseNode";
import { DataNode } from "./DataNode";

export class OutputNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly output: Output,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(context, output.file!, collapsibleState);

    this.iconPath = vscode.Uri.file(path.join(context.extensionPath, 'resources/' + (vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ? 'dark' : 'light'), 'pen.svg'));
  }

  command = {
    command: "vscode.open",
    title: "Open File",
    arguments: [
      vscode.Uri.parse("bebar:" + this.templateHandler.template.file ?? this.templateHandler.template.url! + '/' + this.output.file),
      {
        viewColumn: 2,
      },
    ],
  };

  getChildren(): DataNode[] {
    return [new DataNode(this.context, this.bebarHandler, this.output, this.templateHandler)];
  }
}
