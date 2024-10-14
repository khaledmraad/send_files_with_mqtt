onmessage = async function (event) {
    console.log('Received job from main thread');
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
    } catch (error) {&
        console.error(error);
        postMessage('Error occurred: ' + error.message);
    }
};
