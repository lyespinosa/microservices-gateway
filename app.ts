import express, {Request, Response} from "express";
import morgan from "morgan";

import dotenv from "dotenv";
import {Signale} from "signale";
import proxy from "express-http-proxy";

const app = express();
const signale = new Signale();

dotenv.config();

app.use(morgan('dev'));
const PORT = process.env.PORT || 4000;

app.use('/inventory-service',proxy('http://localhost:3000'));
app.use('/orders-service',proxy('http://localhost:8080'));

// health check
app.get('/', (req: Request, res: Response) => {
    res.json({status: 'UP'});
});

// rutas de auth

app.listen(PORT, () => {
    signale.success(`Api gateway corriendo en http://localhost:${PORT}`);
});