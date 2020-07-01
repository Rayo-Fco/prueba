import express from 'express'
import passport from 'passport'
import cors from 'cors';
import morgan from 'morgan';
import passport_Middleware from './Middlewares/passport';
import config from './Config'
import api from './Routes'
import { Database } from './database'

class App{
  public express: express.Application;

  constructor(){
    this.express = express()
    this.middleware()
    this.routes()
    this.config()
  }
  private config():void {
    this.express.set('port', config.port)
  }

  private middleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(cors());
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(express.json());
    this.express.use(passport.initialize());
    passport.use(passport_Middleware);
  }
  private routes(): void {
    this.express.use(api)
  }
  private database(): void {
    let iniciar = new Database()
    
  }

}

export default new App().express;
