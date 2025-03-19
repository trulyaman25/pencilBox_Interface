import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import '../../globalStyles.css';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: user?.email || "",
        phone: "",
        alternativePhone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        landmark: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving data:', formData);
        setIsEditing(false);
    };

    const personalDetails = [
        { label: "First Name", name: "firstName", type: "text", placeholder: "Enter your first name" },
        { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter your last name" },
        { label: "Username", name: "username", type: "text", placeholder: "Enter your username" },
        { label: "Email", name: "email", type: "email", placeholder: "Enter your email", disabled: true },
        { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number" },
        { label: "Alternative Phone", name: "alternativePhone", type: "tel", placeholder: "Enter alternative phone number" }
    ];

    const addressDetails = [
        { label: "Address Line 1", name: "addressLine1", type: "text", placeholder: "House/Flat No., Building Name" },
        { label: "Address Line 2", name: "addressLine2", type: "text", placeholder: "Street, Area" },
        { label: "City", name: "city", type: "text", placeholder: "Enter city" },
        { label: "State", name: "state", type: "text", placeholder: "Enter state" },
        { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter pincode" },
        { label: "Landmark", name: "landmark", type: "text", placeholder: "Enter nearby landmark (optional)" }
    ];

    return (
        <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-2xl p-8 mb-2">
                    <div className="flex items-center justify-center border-b pb-6">
                        <div className="flex items-center gap-6">
                            <img src={user.picture} alt={user?.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#43806c]" />
                            <div>
                                <h1 className="text-2xl font-Albula-Heavy text-gray-800"> {user.given_name} {user.family_name} </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        {['personal', 'orders'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 font-Albula-Medium hover:cursor-pointer text-sm transition-all duration-300 border-b-2
                                    ${activeTab === tab 
                                        ? 'border-[#43806c] text-[#43806c]' 
                                        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'personal' && (
                    <div className="bg-white rounded-2xl p-8 mb-20">
                        <div className="relative">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-Albula-Medium text-gray-800">Personal Information</h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 font-Albula-Medium text-sm text-[#43806c] hover:text-[#376857] transition-all duration-300"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Information'}
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {personalDetails.map((field, index) => (
                                        <div key={index} className="relative">
                                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                disabled={!isEditing || field.disabled}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                                outline-none transition-all duration-300 font-Albula-Regular disabled:bg-gray-50
                                                hover:cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 font-Albula-Regular">Delivery Address</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                {/* Address Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addressDetails.map((field, index) => (
                                        <div key={index} className="relative">
                                            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#43806c] 
                                                outline-none transition-all duration-300 font-Albula-Regular disabled:bg-gray-50
                                                hover:cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <div className="pt-4">
                                        <button 
                                            onClick={handleSave}
                                            className="w-full px-6 py-3 bg-[#43806c] text-white rounded-xl font-Albula-Medium 
                                            hover:bg-[#376857] transition-all duration-300"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 font-Albula-Regular">No orders yet</p>
                        <button className="px-6 py-2 text-[#43806c] font-Albula-Medium mt-4 hover:text-[#376857]">
                            Browse Products
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Profile;