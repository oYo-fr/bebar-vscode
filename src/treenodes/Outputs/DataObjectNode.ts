import { BaseNode } from "./../BaseNode";
import * as vscode from "vscode";

export class DataObjectNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly key: string,
    public readonly value: Object
  ) {
    super(
      context,
      key,
      value !== null && typeof value === "object"
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );

    if (Array.isArray(value)) {
      this.description = `(${value.length})`;
      this.tooltip = `${this.label} (${value.length})`;
    } else {
      this.tooltip = "";
      if (typeof value !== "object" && value !== null) {
        this.description = `(${value})`;
        this.tooltip = `${value}`;
      }
    }
  }

  getChildren(): DataObjectNode[] {
    const result: DataObjectNode[] = [];
    const valueObject = this.value as Object;

    if (valueObject !== null && typeof valueObject === "object") {
      Object.keys(valueObject).map((key: string) => {
        // @ts-ignore
        const v = valueObject[key];
        result.push(new DataObjectNode(this.context, key, v as Object));
      });
    }
    return result;
  }
}
