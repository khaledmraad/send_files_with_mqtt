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
            

            // console.log(message.payloadString);
            
            

            const jsonMessage = JSON.parse(message.payloadString);


            const fileName = jsonMessage.filename;
            const fileType=jsonMessage.fieltype;
            const decoded_fileContent = atob(jsonMessage.filecontent);

            const value_keys=fileName+"--"+fileType
            
            // console.log(value_keys.split("--"));
            
            
            
            console.log("file type : ", fileType);
            

            setValue((prevValue) => {
                const newValue = { ...prevValue };
                
                if (value_keys in newValue) {

                    newValue[value_keys] += decoded_fileContent;
                } else {
                    newValue[value_keys] = decoded_fileContent;
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

  const downloadFile = (passed_file_name,passed_file_type) => {
    const link = document.createElement("a");

    const  file_fkn_bytes=value[passed_file_name+"--"+passed_file_type];

    let bytes = new Uint8Array(file_fkn_bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = file_fkn_bytes.charCodeAt(i);
  }
  


    const file = new Blob([bytes], { type: passed_file_type });
    console.log(value[passed_file_name+"--"+passed_file_type]);
    
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
            {Object.keys(value).map((key) => <button onClick={() => downloadFile(key.split("--")[0],key.split("--")[1])}>{key.split("--")[0]}</button>)}
        </div>
    );
}