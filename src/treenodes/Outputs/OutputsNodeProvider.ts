import * as vscode from "vscode";
import { BebarHandler } from "bebar";
import { OutputsNode } from "./OutputsNode";
import { BaseNodeProvider } from "../BaseNodeProvider";
import { BaseNode } from "../BaseNode";

export class OutputsNodeProvider extends BaseNodeProvider {
  public async getRoot(): Promise<OutputsNode[]> {
    const handler = this.getHandler();
    return handler ? handler.templateHandlers.map(t => new OutputsNode(this.context, handler, t)) : [];
  }
}
