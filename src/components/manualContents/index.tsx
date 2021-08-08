import React, { useState } from 'react';
import ManualList from '../manualList';
import ManualWebview from '../webview/manualWebView';

const ManualContents = () => {
  const [currentManualURL, setCurrentManualURL] = useState('');

  const handleCurrentManualURLChange = (url: string) => {
    setCurrentManualURL(url);
  };

  return (
    <>
      <ManualList handleCurrentManualURLChange={handleCurrentManualURLChange} />
      {currentManualURL && <ManualWebview url={currentManualURL} />}
    </>
  );
};

export default ManualContents;
