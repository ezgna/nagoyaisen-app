import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // APIを呼び出してログイン
      const response = await axios.post('/api/login', { username, password });
      // ログイン成功時の処理
      onLoginSuccess(response.data);
    } catch (error) {
      console.error('ログインに失敗しました', error);
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
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
