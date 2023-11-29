const fs = require('fs');

// Reading a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Writing to a file
fs.writeFile('output.txt', 'Hello World!', (err) => {
    if (err) throw err;
    console.log('File written successfully!');
});
