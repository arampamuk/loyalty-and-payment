import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/monolith/api', routes);

export default server;
