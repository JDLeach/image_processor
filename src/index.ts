import express, { Request, Response } from 'express';
import imageRoutes from './routes/index';

const app = express();
const port = 3000;

app.use('/image', imageRoutes);

app.get('/', (req: Request, res: Response) => {
	res.send('Root path');
});

//start express server
app.listen(port, () => {
	console.log(`Server started. Port: ${port}`);
});

export default app;
