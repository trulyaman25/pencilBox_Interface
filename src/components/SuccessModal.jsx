import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-sm mx-4 text-center"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200 
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <FaCheckCircle className="text-[#43806c] text-6xl mx-auto" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-Albula-Heavy mt-4 mb-2 bg-gradient-to-r from-[#43806c] to-[#2c5446] bg-clip-text text-transparent">
                    Booking Successful!
                </h2>
                <p className="text-gray-600 font-Albula-Regular mb-6">
                    Your call has been scheduled. We will contact you soon.
                </p>
                <button
                    onClick={onClose}
                    className="w-full px-8 py-3 bg-gradient-to-r from-[#43806c] to-[#2c5446] text-white rounded-xl 
                    hover:from-[#2c5446] hover:to-[#43806c] font-Albula-Medium transition-all duration-300
                    active:scale-95"
                >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SuccessModal;
