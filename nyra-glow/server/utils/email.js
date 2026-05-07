const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingEmail = async (booking, service, user) => {
  const mailOptions = {
    from: `"Nyra Glow" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Booking: ${service.name} - ${booking.date}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5e6d3;border:1px solid #c9a96e;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a0a00,#2d1500);padding:30px;text-align:center;">
          <h1 style="color:#c9a96e;margin:0;letter-spacing:3px;">NYRA GLOW</h1>
          <p style="color:#f5e6d3;margin:5px 0 0;font-size:13px;letter-spacing:2px;">NEW APPOINTMENT</p>
        </div>
        <div style="padding:30px;">
          <p><strong style="color:#c9a96e;">Client:</strong> ${booking.name}</p>
          <p><strong style="color:#c9a96e;">Phone:</strong> ${booking.phone}</p>
          <p><strong style="color:#c9a96e;">Email:</strong> ${user.email}</p>
          <p><strong style="color:#c9a96e;">Service:</strong> ${service.name}</p>
          <p><strong style="color:#c9a96e;">Date:</strong> ${booking.date}</p>
          <p><strong style="color:#c9a96e;">Time:</strong> ${booking.time}</p>
          <p><strong style="color:#c9a96e;">Total:</strong> Rs.${booking.totalPrice}</p>
        </div>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking email sent');
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
};

const sendConfirmationEmail = async (booking, service, userEmail) => {
  const mailOptions = {
    from: `"Nyra Glow" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Booking Confirmed: ${service.name} on ${booking.date}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5e6d3;border:1px solid #c9a96e;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1a0a00,#2d1500);padding:30px;text-align:center;">
          <h1 style="color:#c9a96e;margin:0;letter-spacing:3px;">NYRA GLOW</h1>
          <p style="color:#f5e6d3;margin:10px 0 0;">Your appointment is confirmed!</p>
        </div>
        <div style="padding:30px;">
          <p>Dear ${booking.name},</p>
          <p>Your appointment has been confirmed:</p>
          <p><strong style="color:#c9a96e;">Service:</strong> ${service.name}</p>
          <p><strong style="color:#c9a96e;">Date:</strong> ${booking.date}</p>
          <p><strong style="color:#c9a96e;">Time:</strong> ${booking.time}</p>
          <p><strong style="color:#c9a96e;">Total:</strong> Rs.${booking.totalPrice}</p>
          <p style="color:#c9a96e;">The Nyra Glow Team</p>
        </div>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Confirmation email failed:', err.message);
  }
};

module.exports = { sendBookingEmail, sendConfirmationEmail };
