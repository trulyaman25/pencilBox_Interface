import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose, title = "Booking Successful!", message = "Your call has been scheduled. We will contact you soon." }) => {
    if (!isOpen) return null;

    return (
        <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <motion.div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-sm mx-4 text-center" initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.3,type: "spring",stiffness: 200 }} >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} >
                    <FaCheckCircle className="text-[#43806c] text-6xl mx-auto" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-GoogleSans-Bold mt-4 mb-5 bg-[#43806c] bg-clip-text text-transparent">
                    {title}
                </h2>
                <p className="text-gray-700 font-GoogleSans-Light mb-6">
                    {message}
                </p>
                <button onClick={onClose} className="w-full px-8 py-3 bg-[#43806c] cursor-pointer hover:bg-[#2c5446] text-white rounded-xl font-Albula-Medium transition-all duration-300 active:scale-95" >
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SuccessModal;
