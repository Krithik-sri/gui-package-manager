import * as vscode from "vscode";
import axios from "axios";


export default async function searchNodePackages () {
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