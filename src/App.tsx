import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Introduction from './components/introduction';
import About from './components/about';
import Timeline from './components/timeline';
import { useInitializeTemplateScripts } from './hooks/useInitializeTemplateScripts';

const App: React.FC = () => {
  useInitializeTemplateScripts();

  return (
    <div id="colorlib-page">
      <div id="container-wrap" className="js-fullheight">
        <Sidebar />
        <div id="colorlib-main">
          <div className="js-fullheight">
            <Introduction />
            <About />
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
