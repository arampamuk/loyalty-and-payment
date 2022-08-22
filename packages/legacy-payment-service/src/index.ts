import serverless from 'serverless-http';
import server from './services/server';

export const handler = serverless(server);
