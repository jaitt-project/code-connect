import React, { useState, useRef } from 'react';
// import PromptContainer from './components/PromptContainer';
import MonacoEditor from './components/Editor';
import Sidebar from './components/Sidebar';

const Main = () => {
  const [prompt, setPrompt] = useState("Click Start when you're ready");
  const [timer, setTimer] = useState('00:00');
  const [editorState, setEditorState] = useState('');
  const [passFail, setPassFail] = useState('');
  const timerId = useRef(null);
  const startTime = useRef(null);
  const problem = useRef(null);

  const getPrompt = () => {
    fetch('/problems')
      .then((data) => data.json())
      .then((response) => {
        const { id, title, difficulty, prompt, example, solution } = response;
        problem.current = response;

        setPrompt(prompt + '\n\nExample(s): \n' + example);

        startTime.current = Date.now();
        clearInterval(timerId.current);
        timerId.current = setInterval(updateTimer, 1000);
      })
      .catch((err) => console.log());
  };
    console.log('If you\'re seeing this it means Truman has won. Humanity is no more')
  /* 
  'Fizzbuzz' -> fizzbuzz
    - /problems/:problem
    - if any space replace a dash
    - to lowercase

    'Num Islands' -> num-islands
    - /problems/:problem
    - if any space replace a dash
    - to lowercase
  */

  const submitSolution = () => {
    clearInterval(timerId.current);
    const problemName = problem.current.title
      .replaceAll(' ', '-')
      .toLowerCase();

    console.log(editorState);
    const url = `/problems/${problemName}`;
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ solution: editorState }),
    })
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        if (response.pass) {
          setPassFail('Passed!');
          // clearInterval(timerId.current);
        } else {
          setPassFail('Incorrect Solution. Please try again.');
          timerId.current = setInterval(updateTimer, 1000);
        }
      });
  };

  const updateTimer = () => {
    const nowTime = Date.now();
    let minutesElapsed = new Date(nowTime - startTime.current).getMinutes();
    let secondsElapsed = new Date(nowTime - startTime.current).getSeconds();
    if (minutesElapsed < 10) minutesElapsed = '0' + minutesElapsed;
    if (secondsElapsed < 10) secondsElapsed = '0' + secondsElapsed;
    setTimer(`${minutesElapsed}:${secondsElapsed}`);
  };

  return (
    <div id='Main'>
      <MonacoEditor
        editorValue={'// Code Here \n'}
        setEditorState={setEditorState}
      />

      <Sidebar {...{ getPrompt, timer, submitSolution, prompt, passFail }} />
    </div>
  );
};

export default Main;
