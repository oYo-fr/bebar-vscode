import { BebarHandler, PartialsetHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { PartialNode } from "./PartialNode";
import * as path from "path";

export class PartialsetNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly partialsetHandler: PartialsetHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Expanded
  ) {
    super(context, partialsetHandler.partialset.file ?? partialsetHandler.partialset.url!, collapsibleState);
  }

  getChildren(): PartialNode[] {
    let result: PartialNode[] = this.partialsetHandler.partials.map(p => new PartialNode(this.context, this.bebarHandler, p));
    result = result.sort((a: PartialNode, b: PartialNode) => a.partial.name < b.partial.name ? -1 : (a.partial.name > b.partial.name ? 1 : 0));
    return result;
  }
}
