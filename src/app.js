import logger from 'morgan';
import express from 'express';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Express Ilaro"
    });
})

app.listen(8080, () => console.log('Server running at 8080'));

export default app;