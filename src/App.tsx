import React from 'react';
import Sidebar from './components/sidebar';
import Introduction from './components/introduction';
import About from './components/about';
import Timeline from './components/timeline';

const App: React.FC = () => {  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:ml-72">
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
