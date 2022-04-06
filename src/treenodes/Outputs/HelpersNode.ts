import { BebarHandler, Helper, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { HelperNode } from "./../Helpers/HelperNode";
import * as path from "path";

export class HelpersNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(context, "Available helpers", collapsibleState);
  }

  getChildren(): HelperNode[] {
    const result = [];
    for(let i = 0; i < this.bebarHandler.helpersetHandlers.length; i++) {
      const handler = this.bebarHandler.helpersetHandlers[i];
      for(let j = 0; j < handler.helpers.length; j++) {
        const helper = handler.helpers[j];
        result.push(new HelperNode(this.context, this.bebarHandler, helper));
      }
    }
    for(let i = 0; i < this.templateHandler.helpersetHandlers.length; i++) {
      const handler = this.templateHandler.helpersetHandlers[i];
      for(let j = 0; j < handler.helpers.length; j++) {
        const helper = handler.helpers[j];
        result.push(new HelperNode(this.context, this.bebarHandler, helper));
      }
    }
    return result;
  }
}
