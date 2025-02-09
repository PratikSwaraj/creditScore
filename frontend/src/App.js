import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Report from './components/Report';

const App = () => {
  const [uploadTrigger, setUploadTrigger] = useState(false);

  const handleUpload = () => {
    setUploadTrigger(!uploadTrigger);
  };

  return (
    <div className="App">
      <h1>Credit Report Application</h1>
      <FileUpload onUpload={handleUpload} />
      <Report uploadTrigger={uploadTrigger} />
    </div>
  );
};

export default App;
