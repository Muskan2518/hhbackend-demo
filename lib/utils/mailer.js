const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;

let transporterPromise = null;

async function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const nodemailer = require('nodemailer');
      return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
    })();
  }
  return transporterPromise;
}

async function sendMail({ to, subject, html, text }) {
  const transporter = await getTransporter();
  if (!transporter) {
    console.log('[mailer:console-fallback]', { to, subject, text: text || html });
    return { delivered: false, fallback: true };
  }
  const info = await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to, subject, html, text,
  });
  return { delivered: true, messageId: info.messageId };
}

function advertiserWelcomeEmail({ name, empId, email, phone }) {
  const subject = `Welcome to HHCare — Your Advertiser EmpID: ${empId}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:20px;background:#F5F7FA;border-radius:12px">
      <h2 style="color:#0D47A1;margin:0 0 8px">Welcome, ${name}!</h2>
      <p style="color:#333;font-size:14px">You have been registered as an advertiser with HHCare.</p>
      <div style="background:#fff;border-radius:10px;padding:16px;margin:14px 0;border:1px solid #E5E7EB">
        <p style="margin:4px 0;font-size:13px"><b>Employee ID:</b> <span style="color:#2E7D32;font-weight:700">${empId}</span></p>
        <p style="margin:4px 0;font-size:13px"><b>Name:</b> ${name}</p>
        <p style="margin:4px 0;font-size:13px"><b>Email:</b> ${email}</p>
        <p style="margin:4px 0;font-size:13px"><b>Phone:</b> ${phone}</p>
      </div>
      <p style="color:#555;font-size:13px">Share your <b>EmpID</b> with people you refer. When they sign up using it, they will be linked to your account.</p>
    </div>`;
  const text = `Welcome, ${name}!\n\nYour HHCare Advertiser EmpID: ${empId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nShare your EmpID with people you refer.`;
  return { subject, html, text };
}

module.exports = { sendMail, advertiserWelcomeEmail };
