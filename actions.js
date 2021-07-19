const snippets = require("./snippets.js");
const commands = require("./editorCommands.js");
//https://github.com/VoiceCode/vscode-voicecode/blob/b9c552a98cb8af002b5cd36ce0354435ac37b4ab/extension.js
const getPosition = (activeEditor) => {
  const regEx = /\d+/g;
  const text = activeEditor.document.getText();
  let match;
  if ((match = regEx.exec(text))) {
    const startPos = activeEditor.document.positionAt(match.index);
    const endPos = activeEditor.document.positionAt(
      match.index + match[0].length
    );
    return { startPos, endPos };
  }
};
/**
 * writeText
 * @param {*} vscode
 * @param {*} snippetKey
 */
const writeText = async (vscode, snippetKey) => {
  console.log(">>>>>>>>writing text:", snippetKey);
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  const snippetString = snippets[snippetKey]
    ? snippets[snippetKey]
    : snippetKey;
  if (editor) {
    editor.edit((edition) => {
      edition.insert(editor.selection.active, snippetString);
    });
  }
};

const executeCommand = (vscode, command) => {
  console.log(">>>>>>>>executing command :", commands[command]);
  vscode.commands.executeCommand(commands[command]);
};
module.exports = {
  writeText,
  executeCommand,
};
