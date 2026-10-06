const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes_sharing';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout for quick feedback
    });
    console.log(` MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`\n======================================================`);
    console.error(` [MongoDB Connection Notice]`);
    console.error(` Could not connect to: ${mongoUri}`);
    console.error(` Details: ${error.message}`);
    console.error(` `);
    console.error(` Fixes:`);
    console.error(`  1. For Local MongoDB: Make sure MongoDB service / mongod is running.`);
    console.error(`  2. For MongoDB Atlas (Cloud): Set MONGO_URI in your .env file to your`);
    console.error(`     MongoDB Atlas connection string:`);
    console.error(`     MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/notes_sharing`);
    console.error(`======================================================\n`);
  }
};

module.exports = connectDB;
