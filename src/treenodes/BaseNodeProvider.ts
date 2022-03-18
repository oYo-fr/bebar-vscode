import * as vscode from "vscode";
import { BebarController, BebarHandler } from "bebar";
import { BaseNode } from "./BaseNode";

export class BaseNodeProvider implements vscode.TreeDataProvider<BaseNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<
  BaseNode | undefined | void
  > = new vscode.EventEmitter<BaseNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<
  BaseNode | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(public bebarController: BebarController) {}

  createDirectory(uri: vscode.Uri): void | Thenable<void> {
    return;
  }

  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array> {
    return new Uint8Array();
  }

  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void | Thenable<void> {
    return;
  }

  delete(
    uri: vscode.Uri,
    options: { recursive: boolean }
  ): void | Thenable<void> {
    return;
  }

  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void | Thenable<void> {
    return;
  }

  getTreeItem(element: BaseNode): vscode.TreeItem {
    return element;
  }

  public async getRoot(filter: string = ""): Promise<BaseNode[]> {
    return [];
  }

  async refreshView(): Promise<void> {
    this._onDidChangeTreeData.fire();
    this._onDidChangeTreeData.fire();
  }

  async getChildren(element?: BaseNode): Promise<BaseNode[]> {
    if (!element) {
      const handler = this.getHandler();
      if (handler) {
        return Promise.resolve(await this.getRoot());
      } else {
        return Promise.resolve([]);
      }
    } else {
      const children = element.getChildren();
      return Promise.resolve(children);
    }
  }

  protected getHandler(): BebarHandler | undefined {
    if (this.bebarController && this.bebarController.handlers && this.bebarController.handlers.length > 0) {
      return this.bebarController.handlers[0];
    }
    return undefined;
  }
}
