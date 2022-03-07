import * as vscode from "vscode";

export class Logger {
  public static readonly instance: Logger = new Logger();
  private static outputChannel = vscode.window.createOutputChannel("Bebar");

  private constructor() {}

  public static log(text: string) {
    this.outputChannel.appendLine(text);
  }
}
