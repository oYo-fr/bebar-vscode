import * as vscode from "vscode";
import { BebarHandler } from "bebar";
import { PartialsetNode } from "./PartialsetNode";
import { BaseNodeProvider } from "../BaseNodeProvider";
import { BaseNode } from "../BaseNode";

export class PartialsNodeProvider extends BaseNodeProvider {
  public async getRoot(): Promise<PartialsetNode[]> {
    const handler = this.getHandler();
    return handler ? handler.partialsetHandlers.map(p => new PartialsetNode(handler, p)) : [];
  }
}
