const express = require('express');
const app = express()
const logger = require('./middleware/logger.middleware')
const indexRoute = require('./routes/index.routes')

// register built-in middleware correctly (call the function)
app.use(express.json())
app.use(logger)
app.use('/', indexRoute)
const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})

server.on('error', (err) => {
    console.error('Server failed to start:', err);
})