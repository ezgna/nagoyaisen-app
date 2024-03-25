import React from 'react';
import './DataDisplay.css';

const DataDisplay = ({ data, loading }) => {
  return (
    <div>
      <h2>通知一覧</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data && data.content.map((message, index) => (
          <div key={index} className='messageList' >
            <h3>{message.title}</h3>
            <p><strong>送信者:</strong> {message.sender}</p>
            <p><strong>日時:</strong> {message.datetime}</p>
            {message.attachment && <p><strong>添付ファイル:</strong> {message.attachment}</p>}
            <p>{message.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DataDisplay;
