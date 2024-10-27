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

  function print_content(event) {
    console.log("print");
    
    const file = document.getElementById("myFile").files[0];
    const chunck_size = 1024;
    const chunck_number=Math.ceil(file.size/chunck_size)
    
    const reader = new FileReader();
    reader.onload = ()=> {
      // console.log(reader.result);
      setInputValue(reader.result)


      for (let i = 0; i < chunck_number; i++) {
        const start = i*chunck_size;
        const end = (i + 1) * chunck_size;
        console.log(reader.result.slice(start, end));
        
        console.log("-".repeat(50));
      

    }
    };
    reader.readAsText(file);

    
    

    




    
  }

 

  return (
    <>
      <div>{value}</div>
      <button onClick={() => {send_data(client)}}>send data</button>
      <br></br>
      {/* <form> */}
      <input type="file" id="myFile" name="filename" />
        <input type="submit" onClick={(event)=>print_content(event)} reload="false"/>
      {/* </form> */}

    </>
  );
}

export default App;
