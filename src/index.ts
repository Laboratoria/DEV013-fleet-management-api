import express, { Application, Request, Response  } from 'express';
import taxiRouter from './routes/taxis';
const app: Application = express();
const PORT: number = 3000;

app.use(express.json());


app.use('/taxis', taxiRouter);
app.use('/', (req: Request, res: Response): void => {
    res.send('Hello world!');
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});