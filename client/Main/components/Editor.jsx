import React from 'react';
import Editor from '@monaco-editor/react';

function MonacoEditor() {
  return (
    <Editor
      height='90vh'
      theme='vs-dark'
      defaultLanguage='javascript'
      defaultValue='// some comment'
    />
  );
}

export default MonacoEditor;
