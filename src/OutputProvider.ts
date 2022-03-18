import { BebarController } from "bebar";
import * as vscode from "vscode";
import { OutputsNodeProvider } from "./treenodes/Outputs/OutputsNodeProvider";

export class OutputProvider implements vscode.TextDocumentContentProvider {

  private _onDidChange: vscode.EventEmitter<vscode.Uri> = new vscode.EventEmitter<vscode.Uri>();
  readonly onDidChange: vscode.Event<vscode.Uri> = this._onDidChange.event;

  constructor(
    public context: vscode.ExtensionContext,
    public bebarController: BebarController) {
      context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider("bebar", this)
      );
  }

  // public async refresh(): Promise<void> {
  //   if (
  //     this.outputsNodeProvider &&
  //     this.outputsNodeProvider.bebarController?.bebar &&
  //     this.outputsNodeProvider.bebarParser?.bebar.outputs
  //   ) {
  //     await Promise.all(
  //       this.outputsNodeProvider.bebarParser.bebar.outputs.map(
  //         (o: { file: string }) =>
  //           this._onDidChange.fire(vscode.Uri.parse("bebar:" + o.file))
  //       )
  //     );
  //   }
  // }

  provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<string> {
    if (
      this.bebarController?.handlers &&
      this.bebarController?.handlers[0].templateHandlers
    ) {
      for (
        let i = 0;
        i < this.bebarController?.handlers[0].templateHandlers.length;
        i++
      ) {
        const templateHandler = this.bebarController?.handlers[0].templateHandlers[i];

        if(templateHandler.outputs) {
          for (let j = 0; j < templateHandler.outputs.length; j++) {
            const output = templateHandler.outputs[j];
            if (
              vscode.Uri.parse(
                "bebar:" + templateHandler.template.file ?? templateHandler.template.url! + '/' + output.file
              ).path === uri.path
            ) {
              return output.content;
            }
          }
        }
      }
    }
  }
}
