// backend/createAdminDirect.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdminDirect = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'adminkionjo@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists, updating...');
      
      // Update existing user to admin and set password
      const hashedPassword = await bcrypt.hash('5678admin', 12);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      existingAdmin.firstName = 'Admin';
      existingAdmin.lastName = 'Kionjo';
      await existingAdmin.save();
      
      console.log('✅ Existing user updated to admin');
    } else {
      console.log('👤 Creating new admin user...');
      
      // Create new admin user
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'Kionjo', 
        email: 'adminkionjo@gmail.com',
        password: '5678admin', // This will be hashed by the pre-save hook
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ New admin user created');
    }

    // Verify the admin user
    const verifiedAdmin = await User.findOne({ email: 'adminkionjo@gmail.com' });
    console.log('\n🎉 ADMIN USER READY:');
    console.log(`📧 Email: ${verifiedAdmin.email}`);
    console.log(`👤 Name: ${verifiedAdmin.firstName} ${verifiedAdmin.lastName}`);
    console.log(`🔑 Password: 5678admin`);
    console.log(`⚡ Role: ${verifiedAdmin.role}`);
    console.log(`🆔 ID: ${verifiedAdmin._id}`);
    
    await mongoose.disconnect();
    console.log('\n✅ Database disconnected');
    console.log('\n🚀 You can now login with:');
    console.log('   Email: adminkionjo@gmail.com');
    console.log('   Password: 5678admin');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdminDirect();