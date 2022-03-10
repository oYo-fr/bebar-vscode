import * as vscode from "vscode";

import * as fs from 'fs';
import * as util from 'util';
const readFile = util.promisify(fs.readFile);
import path = require("path");
import { Bebar, BebarHandler, Dataset, Template } from "bebar";

export class BebarEditor implements vscode.CustomTextEditorProvider {
	public static currentPanel: BebarEditor | undefined;

  public static readonly viewType = 'bebar.editor';

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new BebarEditor(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(BebarEditor.viewType, provider);
		return providerRegistration;
	}

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

  public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		// Setup initial content for the webview
		webviewPanel.webview.options = {
			enableScripts: true,
		};
		webviewPanel.webview.html = await this._getHtmlForWebview(webviewPanel.webview);

		function updateWebview() {
			webviewPanel.webview.postMessage({
				type: 'update',
				text: document.getText(),
			});
		}

		// Hook up event handlers so that we can synchronize the webview with the text document.
		//
		// The text document acts as our model, so we have to sync change in the document to our
		// editor and sync changes in the editor back to the document.
		//
		// Remember that a single text document can also be shared between multiple custom
		// editors (this happens for example when you split a custom editor)

		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		// Make sure we get rid of the listener when our editor is closed.
		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
		});

		// Receive message from the webview.
		webviewPanel.webview.onDidReceiveMessage(e => {

      console.log('Message received in Bebar editor');
			// switch (e.type) {
			// 	case 'add':
			// 		this.addNewScratch(document);
			// 		return;

			// 	case 'delete':
			// 		this.deleteScratch(document, e.id);
			// 		return;
			// }
		});

		updateWebview();
	}

  /**
   * Returns the absolute path to a file located in our misc folder.
   *
   * @param file The base file name.
   * @param context The context of this extension to get its path regardless where it is installed.
   */
  public static getResourcesPath(file: string, context: vscode.ExtensionContext, asUri = false): string {
    if (asUri) {
        return vscode.Uri.file(context.asAbsolutePath(path.join('resources', file))).toString();
    }
    return vscode.Uri.file(context.asAbsolutePath(path.join('resources', file))).fsPath;
  }
  public static getResourcesPathAsUri(file: string, context: vscode.ExtensionContext, asUri = false): vscode.Uri {
    return vscode.Uri.file(context.asAbsolutePath(path.join('resources', file)));
  }

	private async _getHtmlForWebview(webview: vscode.Webview) {
    // Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();
    const htmlFilePath = BebarEditor.getResourcesPath("BebarEditor/index.html", this.context);


    /*const htmlBebarHandler = new BebarHandler(new Bebar({
      templates: [
        new Template({
          file: htmlFilePath
        })
      ],
      data: [
        new Dataset({
          name: 'context',
          content: {
            nonce: nonce,
            cspSource: webview.cspSource
          }
        })
      ]
    }));

    try{
      await htmlBebarHandler.load();
    }catch (e) {
      console.log(e);
    }*/

    const html = await readFile(htmlFilePath, 'utf-8');

		let result = replaceAll(html, '<script', `<script nonce="${nonce}"`)
		.replace('</head>', `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${nonce}; style-src ${nonce}; script-src 'nonce-${nonce}';"></head>`);
		result = replaceAll(html, '<link', `<link nonce="${nonce}"`);
		const replaces = ["main.js", "polyfills.js", "runtime.js", "vendor.js", "styles.css"];

		for(let i = 0; i < replaces.length; i++){
			result = result.replace(replaces[i], webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'resources', 'BebarEditor', replaces[i])).toString());
		}
		return result;


		/*
		main.js:894 Refused to load the script 'https://file+.vscode-resource.vscode-webview.net/c%3A/git/bebar/bebar-vscode/resources/BebarEditor/runtime.js' because it violates the following Content Security Policy directive: "script-src 'nonce-DmSn7AZrk3OZdMA3Rv9FJEHbx6ZFZNF7'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback
		 */
    // const html = await readFile(path, "utf8");
		// // Local path to script and css for the webview
		// const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
		// 	this.context.extensionUri, 'media', 'catScratch.js'));

		// const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
		// 	this.context.extensionUri, 'media', 'reset.css'));

		// const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
		// 	this.context.extensionUri, 'media', 'vscode.css'));

		// const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
		// 	this.context.extensionUri, 'media', 'catScratch.css'));

		// return /* html */`
		// 	<!DOCTYPE html>
		// 	<html lang="en">
		// 	<head>
		// 		<meta charset="UTF-8">

		// 		<!--
		// 		Use a content security policy to only allow loading images from https or from our extension directory,
		// 		and only allow scripts that have a specific nonce.
		// 		-->
		// 		<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

		// 		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		// 		<link href="${styleResetUri}" rel="stylesheet" />
		// 		<link href="${styleVSCodeUri}" rel="stylesheet" />
		// 		<link href="${styleMainUri}" rel="stylesheet" />

		// 		<title>Cat Scratch</title>
		// 	</head>
		// 	<body>
		// 		<div class="notes">
		// 			<div class="add-button">
		// 				<button>Scratch!</button>
		// 			</div>
		// 		</div>

		// 		<script nonce="${nonce}" src="${scriptUri}"></script>
		// 	</body>
		// 	</html>`;
	}
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
