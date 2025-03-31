import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaYoutube, FaSpinner } from 'react-icons/fa';
import SuccessModal from '../../components/SuccessModal';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('https://pencilbox-server.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setFormData({ firstName: "", lastName: "", email: "", message: "" });
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 flex flex-row justify-center items-center min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <motion.div 
                    className="bg-white rounded-2xl p-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-Albula-Heavy text-center mb-2">Get in Touch</h1>
                    <p className="text-gray-600 text-center font-Albula-Regular mb-8">
                        Have questions? We'd love to hear from you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                    outline-none transition-all duration-300 font-Albula-Regular"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                    outline-none transition-all duration-300 font-Albula-Regular"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 cursor-pointer bg-[#43806c] text-white rounded-xl font-Albula-Medium 
                            hover:bg-[#376857] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                            active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </motion.div>

                <motion.div 
                    className="bg-white rounded-2xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-Albula-Medium text-center mb-6">Follow Us</h2>
                    <div className="flex justify-center items-center gap-8">
                        <a href="https://www.youtube.com/channel/UC5A9Z4mYSwokyyTnW44dJCg" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={26} className="text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer transition-colors duration-300"/>
                        </a>
                        <a href="https://www.instagram.com/sahilnigam_art/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={26} className="text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer transition-colors duration-300"/>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF size={26} className="text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer transition-colors duration-300"/>
                        </a>
                    </div>
                </motion.div>
            </div>

            <SuccessModal 
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Message Sent!"
                message="Thank you for your message. We will get back to you soon."
            />
        </main>
    );
};

export default Contact;
