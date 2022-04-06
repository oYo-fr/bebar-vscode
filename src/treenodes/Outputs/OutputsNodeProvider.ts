import * as vscode from "vscode";
import { BebarHandler } from "bebar";
import { TemplateNode } from "./TemplateNode";
import { BaseNodeProvider } from "../BaseNodeProvider";
import { BaseNode } from "../BaseNode";

export class OutputsNodeProvider extends BaseNodeProvider {
  public async getRoot(): Promise<TemplateNode[]> {
    const handler = this.getHandler();
    return handler ? handler.templateHandlers.map(t => new TemplateNode(this.context, handler, t)) : [];
  }
}
