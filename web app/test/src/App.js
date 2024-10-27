import logo from "./logo.svg";
import "./App.css";
import Paho from "paho-mqtt"
import { useEffect, useState } from "react";

let client=new Paho.Client(
  "127.0.0.1",
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
)
function App() {

  const [value,setValue]=useState(0)
  const [inputValue,setInputValue]=useState(0)
  
  function message_arrived(message){
    if (message.destinationName === "temperature") {
      setValue(message.payloadString)
    }
  }

  useEffect(() => {

  client.connect({
    onSuccess: ()=> {
      console.log("cooected yes");
      
      client.subscribe("temperature");
      client.onMessageArrived = message_arrived
    },
    onFailure: (error)=> {
      
      console.log(error);
    },
    useSSL: false,
  });

}, []);

  function send_data(c){
    console.log(JSON.stringify({"foo": "bar", "baz": 123}));
    
    const message=new Paho.Message(JSON.stringify({"foo": "bar", "baz": 123}));
    message.destinationName="temperature";
    c.send(message);
    
  } 

 

  return (
    <>
      <div>{value}</div>
      <button onClick={() => {send_data(client)}}>send data</button>

      <form>
      <input type="file" id="myFile" name="filename"/>
        <input type="submit" reload="false"/>
      </form>

    </>
  );
}

export default App;
