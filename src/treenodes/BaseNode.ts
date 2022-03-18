import * as vscode from "vscode";

export class BaseNode extends vscode.TreeItem {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);

    if (context && Array.isArray(context)) {
      this.tooltip = `${this.label} (${context.length})`;
      this.description = `(${context.length})`;
    } else {
      this.tooltip = `${this.label}`;
    }
  }

  getChildren(): BaseNode[] {
    return [];
  }
}
