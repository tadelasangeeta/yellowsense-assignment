import React, { useState } from 'react';
import Jobs from './Jobs';
import Bookmarks from './Bookmarks';

const App = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div>
      {activeTab === 'jobs' && <Jobs />}
      {activeTab === 'bookmarks' && <Bookmarks />}
      
      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab('jobs')}>Jobs</button>
        <button onClick={() => setActiveTab('bookmarks')}>Bookmarks</button>
      </div>
    </div>
  );
};

export default App;