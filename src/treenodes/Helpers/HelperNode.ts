import { BebarHandler, Helper } from "bebar";
import * as vscode from "vscode";
import * as path from "path";
import { BaseNode } from "../BaseNode";

export class HelperNode extends BaseNode {
  constructor(
    public readonly bebarHandler: BebarHandler,
    public readonly helper: Helper,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.None
  ) {
    super(helper.name, collapsibleState);

    this.tooltip = helper.func.toString();
    let origin =  helper.origin;
    if(origin && !origin.startsWith('http')) {
      origin = "./" + path.relative(bebarHandler.rootPath, origin).replace(/\\/gi, "/");
    }
    this.description = origin;
  }

  getChildren(): BaseNode[] {
    return [];
  }
}
