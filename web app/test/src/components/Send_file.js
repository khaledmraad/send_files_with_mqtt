import React from "react";
import { useState, useEffect } from "react";
import Paho from "paho-mqtt";

let client = new Paho.Client(
    "127.0.0.1",
    Number(9001),
    `mqtt-async-test-${parseInt(Math.random() * 100)}`
);
export default function Send_file() {
    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    function message_arrived(message) {
        if (message.destinationName === "temperature") {
            setValue(message.payloadString);
        }
    }

    useEffect(() => {
        client.connect({
            onSuccess: () => {
                console.log("cooected yes");

                client.subscribe("temperature");
                client.onMessageArrived = message_arrived;
            },
            onFailure: (error) => {
                console.log(error);
            },
            useSSL: false,
        });
    }, []);

    function send_data(c, file_name,file_type, file_content) {
        const file_json_object = JSON.stringify({
            filename: file_name,
            fieltype:file_type,
            filecontent: file_content,
        });

        const message = new Paho.Message(file_json_object);
        message.destinationName = "temperature";
        c.send(message);
    }

    function print_content(event) {
        console.log("print");

        const file = document.getElementById("myFile").files[0];
        const chunck_size = 1024;
        const chunck_number = Math.ceil(file.size / chunck_size);

        const reader = new FileReader();
        reader.onload = () => {
            setInputValue(reader.result);

            console.log(file.name);

            for (let i = 0; i < chunck_number; i++) {
                
                const start = i * chunck_size;
                
                const end = (i + 1) * chunck_size;

                console.log(reader.result.slice(start, end));
                // var bytes = new Uint8Array(reader.result.slice(start, end));
                // console.log(bytes);
                

                send_data(client, file.name,file.type, reader.result.slice(start, end));
            }
        };
        reader.readAsArrayBuffer(file);
    }

    return (
        <>
            <div>{value}</div>
            <button
                onClick={() => {
                    send_data(client, "khaled", "mrad");
                }}
            >
                send data
            </button>
            <br></br>
            {/* <form> */}
            <input type="file" id="myFile" name="filename" />
            <input
                type="submit"
                onClick={(event) => print_content(event)}
                reload="false"
            />
            {/* </form> */}
        </>
    );
}
