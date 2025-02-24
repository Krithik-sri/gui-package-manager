
import * as vscode from "vscode";
import searchNodePackages from "./search-extension";


export async function activate(context: vscode.ExtensionContext) {

  console.log(
    'Congratulations, your extension "gui-package-manager" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "gui-package-manager.search-npm-package",
    async () => {
      searchNodePackages();
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
