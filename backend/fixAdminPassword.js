// backend/fixAdminPassword.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const fixAdminPassword = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Find the admin user
    let adminUser = await User.findOne({ email: 'adminkionjo@gmail.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found. Creating new one...');
      
      // Create new admin user - let the User model handle password hashing
      adminUser = new User({
        firstName: 'Admin',
        lastName: 'Kionjo',
        email: 'adminkionjo@gmail.com',
        password: '5678admin', // This will be auto-hashed by the pre-save hook
        role: 'admin'
      });
    } else {
      console.log('⚠️ Admin user found, resetting password...');
      
      // Set the plain password - the pre-save hook will hash it
      adminUser.password = '5678admin';
      adminUser.role = 'admin';
      adminUser.firstName = 'Admin';
      adminUser.lastName = 'Kionjo';
    }

    // Save the user - this will trigger the password hashing
    await adminUser.save();
    console.log('✅ Admin user saved with proper password hashing');

    // Verify by trying to login programmatically
    const verifyUser = await User.findOne({ email: 'adminkionjo@gmail.com' }).select('+password');
    const isPasswordValid = await verifyUser.comparePassword('5678admin');
    
    console.log('\n🎉 ADMIN USER VERIFICATION:');
    console.log(`📧 Email: ${verifyUser.email}`);
    console.log(`👤 Name: ${verifyUser.firstName} ${verifyUser.lastName}`);
    console.log(`🔑 Password: 5678admin`);
    console.log(`⚡ Role: ${verifyUser.role}`);
    console.log(`🔐 Password Valid: ${isPasswordValid ? '✅ YES' : '❌ NO'}`);
    console.log(`🆔 ID: ${verifyUser._id}`);
    
    await mongoose.disconnect();
    console.log('\n✅ Database disconnected');
    
    if (isPasswordValid) {
      console.log('\n🚀 SUCCESS! You can now login with:');
      console.log('   Email: adminkionjo@gmail.com');
      console.log('   Password: 5678admin');
    } else {
      console.log('\n❌ FAILED: Password verification failed');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixAdminPassword();