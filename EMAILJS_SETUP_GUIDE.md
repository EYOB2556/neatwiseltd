# EmailJS Setup Guide for NeatWise Website

Follow this step-by-step guide to set up EmailJS so you can receive customer inquiries directly to your email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the instructions to connect your email account
5. **Important**: Copy your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Click "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Subject:
```
New Inquiry from {{from_name}} - NeatWise Website
```

### Template Body:
```
You have received a new inquiry from your NeatWise website:

Customer Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Service Requested: {{service}}

Message:
{{message}}

---
This email was sent from your NeatWise website contact form.
Reply directly to this email to respond to the customer.
```

4. **Important**: Copy your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abcdefg123456`)

## Step 5: Configure Your Website

1. Open the file `emailjs-config.js` in your website folder
2. Replace the placeholder values with your actual EmailJS credentials:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'your_actual_public_key_here',
    serviceId: 'your_actual_service_id_here', 
    templateId: 'your_actual_template_id_here',
    businessEmail: 'info@neatwiseltd.co.uk' // Your actual business email
};
```

### Example (with fake credentials):
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'user_abc123xyz',
    serviceId: 'service_gmail123', 
    templateId: 'template_inquiry456',
    businessEmail: 'info@neatwiseltd.co.uk'
};
```

## Step 6: Test the Setup

1. Save your changes and upload the updated files to your website
2. Visit your website and fill out the contact form
3. Submit the form
4. Check your email inbox for the inquiry

## Troubleshooting

### Form shows "Email service not configured"
- Check that all values in `emailjs-config.js` are correct
- Make sure you replaced all placeholder values
- Verify your EmailJS service is active

### Emails not being received
- Check your spam/junk folder
- Verify the email address in `businessEmail` is correct
- Check EmailJS dashboard for any error logs

### Form submission fails
- Open browser console (F12) to see error messages
- Verify your internet connection
- Check that EmailJS service is not suspended

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- Basic email templates
- Standard support

If you need more emails, consider upgrading to a paid plan.

## Security Note

Your EmailJS credentials are visible in the browser, but this is normal and safe for EmailJS public keys. However, make sure to:
- Only use the public key (never private keys)
- Set up EmailJS allowed domains in your dashboard
- Monitor your usage regularly

## Need Help?

If you have issues:
1. Check the EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. Check browser console for error messages

---

Once configured, customers will be able to send inquiries through your website, and you'll receive them directly in your email inbox! 