import express from 'express';
import cors from 'cors';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE'); 
      res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type');
      this.app.use(cors());
      next();
    }) 
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;