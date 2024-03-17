import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div>
      <h2>取得したデータ</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataDisplay;
