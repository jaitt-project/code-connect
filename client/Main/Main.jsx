import React, { useState } from 'react';
import PromptContainer from './components/PromptContainer';
import MonacoEditor from './components/Editor';
import Sidebar from './components/Sidebar';

const Main = () => {
  const [prompt, setPrompt] = useState('// code here');
  const [timer, setTimer] = useState('00:00');

  const getPrompt = () => {};
  const submitSolution = () => {};

  // const prompt = 'test';

  return (
    <>
      <PromptContainer />
      <MonacoEditor editorValue={prompt} />
      <Sidebar {...{ getPrompt, timer, submitSolution }} />
    </>
  );
};

export default Main;
