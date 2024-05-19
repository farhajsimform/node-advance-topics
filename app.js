const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();
const PORT = 3000;
const numCPUs = os.cpus().length;

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // Simulate CPU work
    }
    cluster.worker.kill();
    res.send(`Hello from Worker ${process.pid}`);


})
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`Server ${process.pid} is running on port ${PORT}`);
    });
}

