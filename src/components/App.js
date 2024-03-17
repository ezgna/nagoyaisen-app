import React, { useState } from 'react';
import LoginForm from './LoginForm';
import DataDisplay from './DataDisplay';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(null);

  const handleLoginSuccess = (data) => {
    setLoggedIn(true);
    setData(data);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DataDisplay data={data} />
      )}
    </div>
  );
};

export default App;
