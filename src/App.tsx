import React, {FC, useState} from 'react';

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>React 16 + Webpack</h1>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми меня
      </button>
    </div>
  );
};

export default App;