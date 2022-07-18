
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/user.js';
import products from './data/product.js';
import banner from './data/banner.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connect from './config/db.js';
import Post from './models/postModel.js';
import posts from './data/posts.js';

dotenv.config();

connect();

const importData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Post.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        const samplePosts = posts.map(post => {
            return {...post, user: adminUser}
        })

        await Post.insertMany(samplePosts);

        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Post.deleteMany();

        console.log('Data Destroyed...');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
}else{
    importData();
}