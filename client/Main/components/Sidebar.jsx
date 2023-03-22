import React from 'react';
import useState from 'react';
import PromptContainer from './PromptContainer';

function Sidebar(props) {
  const { getPrompt, timer, submitSolution, prompt, passFail } = props;
  return (
    <div id='Sidebar'>
      <PromptContainer prompt={prompt} />
      <button id='startButton' onClick={getPrompt}>
        Start
      </button>

      <div id='timer'>{timer}</div>
      <button id='submitButton' onClick={submitSolution}>
        Submit
      </button>
      <p id='passFail'>{passFail}</p>
    </div>
  );
}

export default Sidebar;
