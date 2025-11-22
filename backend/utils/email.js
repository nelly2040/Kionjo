// backend/utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (order, user) => {
  const mailOptions = {
    from: `"Kionjo Crafts" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B4513;">Thank you for your order!</h2>
        <p>Hello ${user.firstName},</p>
        <p>Your order has been confirmed and is being processed by our artisans.</p>
        
        <h3>Order Details:</h3>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Total Amount:</strong> $${order.total}</p>
        
        <h3>Shipping Address:</h3>
        <p>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
        ${order.shippingAddress.address}<br>
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
        ${order.shippingAddress.country}</p>
        
        <p>We'll notify you when your order ships. Expected delivery: 7-14 business days.</p>
        
        <p style="color: #666;">Thank you for supporting Kenyan artisans!</p>
        <p><strong>The Kionjo Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};