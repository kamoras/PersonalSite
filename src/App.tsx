import React from 'react';
import Sidebar from './components/sidebar';
import Introduction from './components/introduction';
import About from './components/about';
import Timeline from './components/timeline';
import useInitializeTemplateScripts from './hooks/useInitializeTemplateScripts';

const App: React.FC = () => {
  useInitializeTemplateScripts();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col min-h-screen">
          <Introduction />
          <About />
          <Timeline />
        </div>
      </main>
    </div>
  );
};

export default App;
