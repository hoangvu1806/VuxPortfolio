"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-4">
                        404
                    </h1>
                </motion.div>

                {/* Error icon with glow effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <FiAlertCircle className="w-10 h-10 text-red-400" />
                    </div>
                </motion.div>

                {/* Error message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                        Page does not exist
                    </h2>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                        Sorry, the page you are looking for does not exist or has been moved.
                        Please check the URL or go back to the home page.
                    </p>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FiHome className="w-5 h-5" />
                            Back to home
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back
                    </motion.button>
                </motion.div>

                {/* Navigation suggestions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 pt-8 border-t border-gray-800"
                >
                    <p className="text-gray-500 mb-4">
                        Or you can explore:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/about"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                        >
                            About me
                        </Link>
                        <Link
                            href="/projects"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                        >
                            Contact
                        </Link>
                    </div>
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-20, 20],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}