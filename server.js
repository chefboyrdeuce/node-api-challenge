const express = require('express');
const actionRoutes = require('./data/routes/actionRoutes');
const projectRoutes = require('./data/routes/projectRoutes');
const server = express();

server.use(express.json());
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

module.exports = server;
