import React from "react"
import { useState,useEffect } from "react"
import Paho from 'paho-mqtt'


let client=new Paho.Client(
    "127.0.0.1",
    Number(9001),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
  )
export default function Receive_file() {
    const [value,setValue]=useState({})

 
    
    function message_arrived(message){

        if (message.destinationName === "temperature") {
            

            console.log(message.payloadString);
            

            const jsonMessage = JSON.parse(message.payloadString);


            const fileName = jsonMessage.filename;
            const fileType=jsonMessage.fieltype;
            const fileContent = jsonMessage.filecontent;

            console.log("file type : ", fileType);
            

            setValue((prevValue) => {
                const newValue = { ...prevValue };
                
                if (fileName in newValue) {

                    newValue[fileName] += fileContent;
                } else {
                    newValue[fileName] = fileContent;
                }

                // console.log("new value:", newValue);

                return newValue;
            });
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

  const downloadFile = (passed_file_name) => {
    const link = document.createElement("a");
    const file = new Blob([value[passed_file_name]], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = passed_file_name;
    link.click();
    URL.revokeObjectURL(link.href);
 };


    return (
        <div>
            receive_file
            <button onClick={() => {setValue({});console.log("value reset : ", value);
            }}>clear file</button>
            <button onClick={()=>{console.log("value : ", value);}}>show values</button>
            {Object.keys(value).map((key) => <button onClick={() => downloadFile(key)}>{key}</button>)}
        </div>
    );
}