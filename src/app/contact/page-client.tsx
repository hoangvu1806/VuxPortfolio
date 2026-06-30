"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiGithub,
    FiLinkedin,
    FiSend,
    FiUser,
    FiMessageSquare,
    FiEdit,
    FiAlertCircle,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { sendContactEmail, validateContactForm, type ContactFormData } from "@/utils/email";
import { Toast } from "@/components/ui/toast";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setValidationErrors([]);

        // Prepare form data
        const formData: ContactFormData = {
            from_name: formState.name,
            from_email: formState.email,
            subject: formState.subject,
            message: formState.message,
        };

        // Validate form
        const errors = validateContactForm(formData);
        if (errors.length > 0) {
            setValidationErrors(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            await sendContactEmail(formData);
            setShowSuccessToast(true);
            setFormState({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
            setShowErrorToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactItems = [
        {
            icon: <FiMail className="w-6 h-6 text-primary" />,
            title: "Email",
            value: profile.email,
            link: `mailto:${profile.email}`,
            bgColor: "bg-primary/20 shadow-primary-glow",
            delay: 0.2,
        },
        {
            icon: <FiPhone className="w-6 h-6 text-secondary" />,
            title: "Phone",
            value: profile.phone,
            link: `tel:${profile.phone}`,
            bgColor: "bg-secondary/20 shadow-secondary-glow",
            delay: 0.3,
        },
        {
            icon: <FiMapPin className="w-6 h-6 text-accent" />,
            title: "Address",
            value: `${profile.location.address}, ${profile.location.district}, ${profile.location.city}, ${profile.location.country}`,
            bgColor: "bg-accent/20 shadow-accent-glow",
            delay: 0.4,
        },
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="min-h-[40vh] relative flex items-center justify-center overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="container px-4 md:px-6 mx-auto text-center"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Contact
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Let's connect to collaborate, exchange ideas, or simply
                        have a conversation!
                    </p>
                </motion.div>
            </section>

            <section className="py-12">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                            {/* Contact Information */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative backdrop-blur-sm bg-gray-900/30 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50 h-full"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold mb-8 text-gray-100">
                                            Contact Information
                                        </h2>

                                        <div className="space-y-8 mb-8">
                                            {contactItems.map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: item.delay,
                                                    }}
                                                    className="flex items-start"
                                                >
                                                    <motion.div
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        className={`${item.bgColor} rounded-full p-4 mr-5 shadow-lg`}
                                                    >
                                                        {item.icon}
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="font-medium text-lg text-gray-100 mb-1">
                                                            {item.title}
                                                        </h3>
                                                        {item.link ? (
                                                            <a
                                                                href={item.link}
                                                                className="text-gray-300 hover:text-primary transition-colors"
                                                            >
                                                                {item.value}
                                                            </a>
                                                        ) : (
                                                            <p className="text-gray-300">
                                                                {item.value}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-gray-700/50">
                                            <h3 className="font-medium text-lg text-gray-100 mb-5">
                                                Connect with me
                                            </h3>
                                            <div className="flex space-x-6">
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.2,
                                                        y: -3,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 10,
                                                    }}
                                                >
                                                    <Link
                                                        href={
                                                            profile.social
                                                                .github
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-primary transition-colors duration-300"
                                                        aria-label="GitHub"
                                                    >
                                                        <FiGithub className="w-8 h-8" />
                                                    </Link>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.2,
                                                        y: -3,
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 10,
                                                    }}
                                                >
                                                    <Link
                                                        href={
                                                            profile.social
                                                                .linkedin
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-secondary transition-colors duration-300"
                                                        aria-label="LinkedIn"
                                                    >
                                                        <FiLinkedin className="w-8 h-8" />
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="relative backdrop-blur-sm bg-gray-900/30 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-bold mb-8 text-gray-100 flex items-center">
                                            <FiMessageSquare className="mr-3 text-primary" />
                                            Send a Message
                                        </h2>

                                        {/* Validation Errors */}
                                        {validationErrors.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-900/30 border border-red-700/50 p-4 rounded-xl mb-6"
                                            >
                                                <div className="flex items-center mb-2">
                                                    <FiAlertCircle className="text-red-500 mr-2" />
                                                    <h4 className="text-red-400 font-medium">Please fix the following errors:</h4>
                                                </div>
                                                <ul className="text-red-300 text-sm space-y-1">
                                                    {validationErrors.map((error, index) => (
                                                        <li key={index}>• {error}</li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}

                                        {/* Contact Form */}
                                        <form
                                            className="space-y-6"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="flex items-center text-sm font-medium text-gray-300 mb-2"
                                                    >
                                                        <FiUser className="mr-2 text-primary" />
                                                        Your Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        value={
                                                            formState.name
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800/50 text-gray-100 backdrop-blur-sm transition-all"
                                                        placeholder="Enter your name"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="flex items-center text-sm font-medium text-gray-300 mb-2"
                                                    >
                                                        <FiMail className="mr-2 text-primary" />
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={
                                                            formState.email
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800/50 text-gray-100 backdrop-blur-sm transition-all"
                                                        placeholder="your.email@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="subject"
                                                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                                                >
                                                    <FiEdit className="mr-2 text-primary" />
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    value={
                                                        formState.subject
                                                    }
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800/50 text-gray-100 backdrop-blur-sm transition-all"
                                                    placeholder="Enter message subject"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="message"
                                                    className="flex items-center text-sm font-medium text-gray-300 mb-2"
                                                >
                                                    <FiMessageSquare className="mr-2 text-primary" />
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={5}
                                                    value={
                                                        formState.message
                                                    }
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-800/50 text-gray-100 backdrop-blur-sm transition-all"
                                                    placeholder="Enter your message"
                                                    required
                                                ></textarea>
                                            </div>

                                            <div>
                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    whileHover={{
                                                        scale: 1.02,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.98,
                                                    }}
                                                    className={`w-full inline-flex justify-center items-center py-3 px-6 text-base font-medium rounded-lg shadow-lg transition-all duration-300 ${isSubmitting
                                                        ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary-glow"
                                                        }`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg
                                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message{" "}
                                                            <FiSend className="ml-2" />
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toast Notifications */}
            <Toast
                type="success"
                title="Message Sent Successfully!"
                message="Thank you for contacting me. I will respond as soon as possible."
                isVisible={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
            />

            <Toast
                type="error"
                title="Failed to Send Message"
                message={submitError || "An unexpected error occurred. Please try again."}
                isVisible={showErrorToast}
                onClose={() => setShowErrorToast(false)}
            />
        </MainLayout>
    );
}
