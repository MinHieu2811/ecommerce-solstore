import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connect from './config/db.js';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import favorRoutes from './routes/favorRoutes.js';
 
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'; 

dotenv.config();

connect();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/' ,(req, res) => {
    res.send('Hello World');
})

app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes );
app.use('/api/favor', favorRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.get('/api/config/googlemap', (req, res) => res.send(process.env.GOOGLE_MAP_API_KEY));

app.get('/*', function(req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));