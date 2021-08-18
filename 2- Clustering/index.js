const cluster = require('cluster');

if (cluster.isMaster) {

    // By default for the first time the Node Instance is the Cluster Manager.
    // To check this use cluster.isMaster -> Returns true if it is First Instance

    cluster.fork();
    //cluster.fork();
} else {
    const express = require('express');
    const app = express();

    function doWork(tillTime) {
        const start = Date.now();
        while (Date.now() - start < tillTime) { }
    }

    app.get('/', (req, res, next) => {
        doWork(5000); // Blocking your event loop. If someone hits the same url they may take more than that.
        res.send('Hello World');
    })

    app.get('/fast', (req, res, next) => {
        res.send('Fast');
    })

    app.listen(3000, () => {
        console.log('listening on port 3000');
    })
}

/**
 * * Whenever we hit the server with localhost:3000 and localhost:3000/fast
 * * The first req blocks the server for 5 seconds but the second request is immediately processed.
 * * The reason is because since we used cluster.fork() it creates multiple worker instances.
 * * The first instance (Cluster Manger) only checks your health of worker instances.
 * * One fork doesn't do anything. Instead have atleast two so that is one worker instance is blocked the other process the request
 */