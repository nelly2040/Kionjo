// backend/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'adminkionjo@gmail.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'Kionjo',
      email: 'adminkionjo@gmail.com',
      password: '5678admin',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log(`Name: ${adminUser.firstName} ${adminUser.lastName}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: 5678admin`);
    console.log(`Role: ${adminUser.role}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

createAdminUser();