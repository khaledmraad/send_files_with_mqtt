// import {mqtt} from 'mqtt'

// let client;

onmessage = async function (event) {
    console.log('Received job from main thread');
    // const { type } = event.data;

    // if (type === 'test') {
    //     postMessage('Hello from worker');
    // }
    const url = 'http://127.0.0.1:8000/data';

    try {

        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const result = await response.text(); 
        postMessage(result);
    } catch (error) {
        console.error(error);
        postMessage('Error occurred: ' + error.message);
    }


    // const protocol = 'mqtt'
    // const host = 'broker.emqx.io'
    // const port = '1883'
    // const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    // const connectUrl = `${protocol}://${host}:${port}`

    // const client = mqtt.connect(connectUrl, {
    //     clientId,
    //     clean: true,
    //     connectTimeout: 4000,
    //     username: 'emqx',
    //     password: 'public',
    //     reconnectPeriod: 1000,
    //   })

    
    // const topic = '/nodejs/mqtt'

    // client.on('connect', () => {
    //     console.log('Connected')
    //     client.subscribe([topic], () => {
    //       console.log(`Subscribe to topic '${topic}'`)
    //     })
    //   })

    // client.on('message', (topic, payload) => {
    //     console.log('Received Message:', topic, payload.toString())
    // })
      
      


};
