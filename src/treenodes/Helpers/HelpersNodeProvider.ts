import * as vscode from "vscode";
import { BebarHandler } from "bebar";
import { HelpersetNode } from "./HelpersetNode";
import { BaseNodeProvider } from "../BaseNodeProvider";
import { BaseNode } from "../BaseNode";

export class HelpersNodeProvider extends BaseNodeProvider {
  public async getRoot(): Promise<HelpersetNode[]> {
    const handler = this.getHandler();
    return handler ? handler.helpersetHandlers.map(p => new HelpersetNode(this.context, handler, p)) : [];
  }
}
