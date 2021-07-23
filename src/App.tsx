import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Hello = () => {
  useEffect(() => {
    const fileDirectory = ipcRenderer.sendSync('sync-file-directory', 'ping2');
    console.log(fileDirectory.split(','));
  }, []);
  return <div />;
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
