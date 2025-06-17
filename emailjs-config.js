// EmailJS Configuration File
// Replace the placeholder values with your actual EmailJS credentials

const EMAILJS_CONFIG = {
    // Your EmailJS Public Key (from EmailJS dashboard)
    publicKey: 'jMCXuF3v_DclQlltp',
    
    // Your EmailJS Service ID (from EmailJS dashboard)
    serviceId: 'service_2ie1zaj', 
    
    // Your EmailJS Template ID (from EmailJS dashboard)
    templateId: 'template_rrtrljo',
    
    // Your business email (where you want to receive inquiries)
    businessEmail: 'info@neatwiseltd.co.uk'
};

// Instructions for setup:
// 1. Go to https://www.emailjs.com/ and sign up
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with the following variables:
//    - {{from_name}} - Customer's name
//    - {{from_email}} - Customer's email
//    - {{phone}} - Customer's phone
//    - {{service}} - Requested service
//    - {{message}} - Customer's message
// 4. Replace the values above with your actual credentials
// 5. Update businessEmail with your actual business email

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
} 