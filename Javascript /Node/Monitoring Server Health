const http = require('http');

function checkServerStatus(url) {
    http.get(url, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('Server is up and running');
        }
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

checkServerStatus('http://localhost:3000');
