import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const emailConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
};

// Initialize EmailJS
emailjs.init(emailConfig.publicKey);

export interface ContactFormData {
    from_name: string;
    from_email: string;
    subject: string;
    message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
    try {
        const result = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            {
                from_name: formData.from_name,
                from_email: formData.from_email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'dohoangvu.nt2005@gmail.com', // Your email
            }
        );

        if (result.status !== 200) {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw new Error('Failed to send message. Please try again.');
    }
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate form data
export const validateContactForm = (data: ContactFormData): string[] => {
    const errors: string[] = [];

    if (!data.from_name.trim()) {
        errors.push('Name is required');
    }

    if (!data.from_email.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.from_email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.subject.trim()) {
        errors.push('Subject is required');
    }

    if (!data.message.trim()) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
};