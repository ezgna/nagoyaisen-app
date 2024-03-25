import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess, setData, setLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    } finally {
      setLoading(false);
    }
  };

  const establishWebSocketConnection = () => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => {
      console.log('WebSocket connection established(client)');
    };
    ws.onmessage = (message) => {
      if (message.data === 'scrapingComplete') {
        fetchData();
      }
    };
    return ws;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response);
      onLoginSuccess();

      const ws = establishWebSocketConnection();
      return () => {
        ws.close();
      };

    } catch (error) {
      console.error('login failed', error);
      setErrorMessage('ユーザー名かパスワードが間違っています');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザー名:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
