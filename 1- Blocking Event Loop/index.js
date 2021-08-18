const express = require('express');
const app = express();

function doWork(tillTime) {
    const start = Date.now();
    while (Date.now() - start < tillTime) { }
}

app.use('/', (req, res, next) => {
    doWork(5000); // Blocking your event loop. If someone hits the same url they may take more than that.
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})