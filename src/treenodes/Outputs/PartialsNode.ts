import { BebarHandler, Partial, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { PartialNode } from "../Partials/PartialNode";
import * as path from "path";

export class PartialsNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(context, "Available partials", collapsibleState);
  }

  getChildren(): PartialNode[] {
    const result = [];
    for(let i = 0; i < this.bebarHandler.partialsetHandlers.length; i++) {
      const handler = this.bebarHandler.partialsetHandlers[i];
      for(let j = 0; j < handler.partials.length; j++) {
        const partial = handler.partials[j];
        result.push(new PartialNode(this.context, this.bebarHandler, partial));
      }
    }
    for(let i = 0; i < this.templateHandler.partialsetHandlers.length; i++) {
      const handler = this.templateHandler.partialsetHandlers[i];
      for(let j = 0; j < handler.partials.length; j++) {
        const partial = handler.partials[j];
        result.push(new PartialNode(this.context, this.bebarHandler, partial));
      }
    }
    return result;
  }
}
