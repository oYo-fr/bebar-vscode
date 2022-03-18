import { BebarHandler, Partial } from "bebar";
import * as vscode from "vscode";
import * as path from "path";
import { BaseNode } from "../BaseNode";

export class PartialNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly partial: Partial,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(context, partial.name, collapsibleState);

    this.tooltip = partial.code;
    let origin =  partial.origin;
    if(origin && !origin.startsWith('http')) {
      origin = "./" + path.relative(bebarHandler.rootPath, origin).replace(/\\/gi, "/");
    }
    this.description = origin;
  }

  getChildren(): BaseNode[] {
    return [];
  }
}
