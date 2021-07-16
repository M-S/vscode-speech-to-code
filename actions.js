const writeText = (vscode) => {
  // Get the active text editor
  //https://github.com/microsoft/vscode-extension-samples/blob/main/document-editing-sample/src/extension.ts
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const snippet = new vscode.SnippetString(`function() {
  }`);
    editor.insertSnippet(snippet);
  }
};
module.exports = {
  writeText,
};
