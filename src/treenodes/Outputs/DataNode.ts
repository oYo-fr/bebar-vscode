import { BebarHandler, Output, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import { BaseNode } from "../BaseNode";
import { DataObjectNode } from "./DataObjectNode";

export class DataNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly output: Output,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Expanded
  ) {
    super(context, "Data", collapsibleState);
  }

  getChildren(): BaseNode[] {
    const result: BaseNode[] = [];
    const valueObject = this.output.data as Object;

    if (valueObject !== null && typeof valueObject === "object") {
      Object.keys(valueObject).map((key: string) => {
        // @ts-ignore
        const v = valueObject[key];
        result.push(new DataObjectNode(this.context, key, v as Object, this.output));
      });
    }
    return result;
  }
}
