import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';

function App() {
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {

    
    const myWorker = new Worker('worker.js');
    console.log("worker created");

    myWorker.onmessage = function (event) {
      console.log('Received result from worker:', event.data);
      setResult(event.data);
    };

    setWorker(myWorker);

    // return () => {
    //   myWorker.terminate();
    // };
  }, []);

  const handleClick = () => {
    if (worker) {
      worker.postMessage(0); 
    }
  };

  
  return (
    <>
      <h1>hello</h1>
      <div>
        <p>Result from the worker: {result}</p>
        <button onClick={handleClick}>fetch server </button>
      </div>
    </>
  );
}

export default App;
