// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import axios from "axios";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "gui-package-manager" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "gui-package-manager.search-npm-package",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const package_name = await vscode.window.showInputBox({
        prompt: "Enter an npm package name",
        placeHolder: "e.g., express, react, mongoose",
      });
      if (!package_name) {
        return;
      }
      try {
       console.log("package_name",package_name);
        const res = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${package_name}&size=20`);
        const data = await res.data
		// console.log(data,"ajfljlkj");

        if (!data.objects || data.objects.length === 0) {
          vscode.window.showInformationMessage("No packages found.");
          return;
        }

        const packageList = data.objects.map((pkg: any) => ({
          label: pkg.package.name,
          description: pkg.package.description || "No description available",
          detail: `Version: ${pkg.package.version} | Author: ${
            pkg.package.publisher.username || "Unknown"
          }`,
        }));
		console.log(packageList,"pklist");
        const selectedPackage = await vscode.window.showQuickPick(packageList, {
          placeHolder: "Select an NPM package",
        });
      } catch (error) {
        vscode.window.showErrorMessage(
          "Error fetching data from npm registry."
        );
        console.error(error);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
