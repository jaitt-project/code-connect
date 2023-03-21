import React from 'react';
import Editor from '@monaco-editor/react';

function MonacoEditor(props) {


  return (
    <Editor
      height='90vh'
      theme='vs-dark'
      defaultLanguage='javascript'
      defaultValue={props.editorValue}
    />
  );
}

export default MonacoEditor;
