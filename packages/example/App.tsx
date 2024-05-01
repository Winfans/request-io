import { useEffect } from 'react';
import './App.css';
import { testGet } from './services';

function App() {
  useEffect(() => {
    testGet({ content: 'testGet' }).then((res) => {
      console.log(res);
    });
  }, []);
  const abortHandler = () => {
    testGet({ content: 'testGet' }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      test
      <button onClick={abortHandler}>abort</button>
    </>
  );
}

export default App;
