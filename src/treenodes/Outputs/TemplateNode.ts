import { BebarHandler, Template, TemplateHandler } from "bebar";
import * as vscode from "vscode";
import * as path from "path";
import { BaseNode } from "../BaseNode";
import { OutputsNode } from "./OutputsNode";
import { HelpersNode } from "./HelpersNode";
import { PartialsNode } from "./PartialsNode";

export class TemplateNode extends BaseNode {
  constructor(
    public context: vscode.ExtensionContext,
    public readonly bebarHandler: BebarHandler,
    public readonly templateHandler: TemplateHandler,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(
      context,
      templateHandler.template.name ?? templateHandler.template.file ?? templateHandler.template.url!,
      collapsibleState);
    if (templateHandler.template.name) {
      this.description = templateHandler.template.file ?? templateHandler.template.url!;
    }
  }

  command = {
    command: "vscode.open",
    title: "Open File",
    arguments: [
      vscode.Uri.parse(this.templateHandler.template.file?
        "file:" + path.resolve(this.bebarHandler.rootPath, this.templateHandler.template.file) :
        this.templateHandler.template.url!),
      {
        viewColumn: 1,
      },
    ],
  };

  getChildren(): BaseNode[] {
    const result: BaseNode[] = [new OutputsNode(this.context, this.bebarHandler, this.templateHandler)];
    const helpersNode = new HelpersNode(this.context, this.bebarHandler, this.templateHandler);
    if (helpersNode.getChildren().length > 0) {
      result.push(helpersNode);
    }
    const partialsNode = new PartialsNode(this.context, this.bebarHandler, this.templateHandler);
    if (partialsNode.getChildren().length > 0) {
      result.push(partialsNode);
    }
    return result;
  }
}
