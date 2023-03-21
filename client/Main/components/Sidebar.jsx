import React from 'react';

function Sidebar(props) {
  const { getPrompt, timer, submitSolution } = props;
  return (
    <div id='Sidebar'>
      <button id='submitButton' onClick={getPrompt}>
        Get Prompt
      </button>

      <div id='timer'>{timer}</div>
      <button id='submitButton' onClick={submitSolution}>
        Submit
      </button>
    </div>
  );
}

export default Sidebar;
