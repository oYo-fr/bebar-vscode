import { BebarHandler, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { OutputNode } from "./OutputNode";
import * as path from "path";

export class OutputsNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Expanded
  ) {
    super(context, "Outputs", collapsibleState);
  }

  getChildren(): OutputNode[] {
    let result: OutputNode[] = this.templateHandler.outputs.map(p => new OutputNode(this.context, this.bebarHandler, p, this.templateHandler));
    return result;
  }
}
