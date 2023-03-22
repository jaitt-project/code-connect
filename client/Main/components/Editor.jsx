import React from 'react';
import Editor from '@monaco-editor/react';

function MonacoEditor(props) {
  const { editorValue, setEditorState } = props;
  return (
    <Editor
      height='100vh'
      theme='vs-dark'
      defaultLanguage='javascript'
      defaultValue={editorValue}
      onChange={setEditorState}
    />
  );
}

export default MonacoEditor;
