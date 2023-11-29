const fs = require('fs');
const path = require('path');

const logDirectory = '/var/log/myapp';

// Example: Deleting logs older than 7 days
fs.readdir(logDirectory, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        let filePath = path.join(logDirectory, file);
        fs.stat(filePath, (err, stat) => {
            if (err) throw err;

            let now = new Date().getTime();
            let fileTime = new Date(stat.mtime).getTime();
            let diff = now - fileTime;

            // 604800000 milliseconds = 7 days
            if (diff > 604800000) {
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log(`${file} was deleted`);
                });
            }
        });
    });
});
