import { BebarHandler, HelpersetHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { HelperNode } from "./HelperNode";

export class HelpersetNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly helpersetHandler: HelpersetHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Expanded
  ) {
    super(context, helpersetHandler.helperset.file ?? helpersetHandler.helperset.url!, collapsibleState);
  }

  getChildren(): HelperNode[] {
    let result: HelperNode[] = this.helpersetHandler.helpers.map(p => new HelperNode(this.context, this.bebarHandler, p));
    result = result.sort((a: HelperNode, b: HelperNode) => a.helper.name < b.helper.name ? -1 : (a.helper.name > b.helper.name ? 1 : 0));
    return result;
  }
}
