const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/gofoodmern';

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Fetch food items
        const foodItemsCollection = await mongoose.connection.db.collection('food_items').find({}).toArray();

        // Fetch food categories
        const foodCategoryCollection = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

        // Add food category to each food item
        const foodItemsWithCategory = foodItemsCollection.map(foodItem => {
            const categoryId = foodItem.categoryId; // Adjust this according to your schema
            const category = foodCategoryCollection.find(category => category._id === categoryId); // Adjust this according to your schema

            return { ...foodItem, category };
        });

        // Set global variables
        global.food_items = foodItemsWithCategory;
        global.foodCategory = foodCategoryCollection;

        // Log fetched data
        // console.log('Fetched data from database:', foodItemsWithCategory);
        // console.log('Fetched food categories:', foodCategoryCollection);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
