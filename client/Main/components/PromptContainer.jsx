import React from 'react';

function PromptContainer(props) {
  const { prompt } = props;
  return <pre id='PromptContainer'>{prompt}</pre>;
}

export default PromptContainer;
