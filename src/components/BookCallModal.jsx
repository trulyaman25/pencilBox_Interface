import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const BookCallModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        date: '',
        time: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const modalRef = useRef();

    const timeSlots = [
        "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM -12:00 PM",
        "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formattedDate = formatDate(formData.date);

            const response = await fetch('https://pencilbox-server.onrender.com/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: formattedDate,
                    timeSlot: formData.time
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book call');
            }

            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                date: '',
                time: ''
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error booking call:', error);
            alert('Failed to book call. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                ref={modalRef}
                className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 my-8"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-GoogleSans-Bold bg-gray-800 bg-clip-text text-transparent">
                        Book a Call
                    </h2>
                    <p className="text-gray-600 font-GoogleSans-Light">
                        Schedule a consultation with our artist
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                First Name
                            </label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular"
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
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                            Phone Number
                        </label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                            outline-none transition-all duration-300 font-Albula-Regular"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                Preferred Date
                            </label>
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                Preferred Time Slot
                            </label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                outline-none transition-all duration-300 font-Albula-Regular appearance-none bg-white"
                            >
                                <option value="">Select a time slot</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot.replace('-', ' - ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 cursor-pointer border-2 border-[#43806c] text-[#43806c] rounded-xl hover:bg-rose-50 hover:border-rose-400 hover:text-rose-500 font-Albula-Medium transition-all duration-300 active:scale-95" >
                            Cancel
                        </button>

                        <button type="submit" disabled={isLoading} className="flex-1 px-4 py-3 cursor-pointer bg-[#43806c] text-white rounded-xl  hover:bg-[#2c5446] font-Albula-Medium transition-all duration-300  disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2" >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Booking...</span>
                                </>
                            ) : (
                                'Book Call'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default BookCallModal;
