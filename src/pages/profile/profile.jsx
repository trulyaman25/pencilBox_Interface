import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import '../../globalStyles.css';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
        landmark: "",
        profileCompleted: false,
        originalUsername: ""
    });
    const [errors, setErrors] = useState({});
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [checkingUsername, setCheckingUsername] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.sub) {
                console.log('Fetching profile for auth0Id:', user.sub);
                try {
                    const response = await fetch(`https://pencilbox-server.onrender.com/api/profile/${user.sub}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch profile data');
                    }
                    const data = await response.json();
                    console.log('MongoDB Profile Data:', {
                        receivedAt: new Date().toISOString(),
                        userId: user.sub,
                        profileData: data
                    });
                    
                    if (data._id) {
                        // Convert all string values to lowercase
                        const lowercaseData = Object.fromEntries(
                            Object.entries(data).map(([key, value]) => 
                                [key, typeof value === 'string' ? value.toLowerCase() : value]
                            )
                        );
                        
                        const updatedFormData = {
                            ...formData,
                            ...lowercaseData,
                            email: user.email?.toLowerCase() || "",
                            originalUsername: data.username?.toLowerCase()
                        };
                        console.log('Form Data After MongoDB Update:', updatedFormData);
                        setFormData(updatedFormData);
                    } else {
                        console.log('No existing profile found in MongoDB');
                    }
                } catch (error) {
                    console.error('MongoDB Profile Fetch Error:', error);
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    useEffect(() => {
        const checkUsernameDebounced = setTimeout(() => {
            if (formData.username?.trim()) {
                checkUsername(formData.username);
            }
        }, 300);

        return () => clearTimeout(checkUsernameDebounced);
    }, [formData.username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.toLowerCase()
        }));
        
        if (name === 'username') {
            setErrors(prev => ({
                ...prev,
                username: ''
            }));
        }
    };

    const checkUsername = async (username) => {
        if (!username.trim()) {
            setUsernameAvailable(true);
            setCheckingUsername(false);
            return;
        }

        setCheckingUsername(true);
        try {
            const response = await fetch(
                `https://pencilbox-server.onrender.com/api/check-username/${username}?auth0Id=${user.sub}`
            );
            const data = await response.json();
            setUsernameAvailable(data.available || data.currentUser);
            
            if (!data.available && !data.currentUser) {
                setErrors(prev => ({
                    ...prev,
                    username: 'Username is already taken'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    username: ''
                }));
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }
        setCheckingUsername(false);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.username?.trim()) newErrors.username = 'Username is required';
        if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (formData.alternativePhone && !/^[0-9]{10}$/.test(formData.alternativePhone)) {
            newErrors.alternativePhone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.addressLine1?.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!formData.addressLine2?.trim()) newErrors.addressLine2 = 'Address Line 2 is required';
        if (!formData.city?.trim()) newErrors.city = 'City is required';
        if (!formData.state?.trim()) newErrors.state = 'State is required';
        if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
        if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }

        if (!usernameAvailable) {
            newErrors.username = 'Please choose a different username';
            setErrors(newErrors);
            return false;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            if (!user?.sub) {
                console.error('No user ID found');
                return;
            }

            const response = await fetch('https://pencilbox-server.onrender.com/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    auth0Id: user.sub,
                    profileCompleted: true,
                    email: user.email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save profile');
            }

            const data = await response.json();
            setFormData(prev => ({
                ...prev,
                ...data
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleTabChange = (tab) => {
        if (tab === 'orders') {
            window.location.href = '/orders';
        } else {
            setActiveTab(tab);
        }
    };

    const personalDetails = [
        { label: "First Name", name: "firstName", type: "text", placeholder: "Enter your first name" },
        { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter your last name" },
        { label: "Username", name: "username", type: "text", placeholder: "Enter your username", },
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

    const renderInputField = (field, index) => (
        <div key={index} className="relative">
            <label className="block text-sm font-Albula-Medium text-gray-600 mb-2">
                {field.label} {field.name !== 'landmark' && '*'}
            </label>
            <div className="relative">
                <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={!isEditing || field.disabled}
                    className={`w-full px-4 py-2.5 rounded-xl border 
                        ${errors[field.name] ? 'border-red-500' : 
                          isEditing && field.name === 'username' && usernameAvailable && formData.username ? 'border-green-500' : 
                          'border-gray-200'}
                        focus:border-[#43806c] outline-none transition-all duration-300 
                        font-Albula-Regular disabled:bg-gray-50 hover:cursor-pointer`}
                />
                {isEditing && field.name === 'username' && checkingUsername && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        Checking...
                    </span>
                )}
            </div>

            {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}

            {isEditing && 
                field.name === 'username' && usernameAvailable && formData.username && !errors.username &&formData.username !== formData.originalUsername && (
                <p className="text-green-500 text-xs mt-1">Username is available</p>
            )}
        </div>
    );

    const renderActionButton = () => {
        if (isEditing) {
            return (
                <div className="flex gap-3 w-full mt-10">
                    <button onClick={() => setIsEditing(false)} className="cursor-pointer flex-1 px-6 py-3 border-2 border-[#43806c] text-[#43806c] rounded-xl hover:bg-rose-50 hover:border-rose-400 hover:text-rose-500 font-Albula-Medium  transition-all duration-300 active:scale-95" >
                        Cancel
                    </button>

                    <button onClick={handleSave} className="cursor-pointer flex-1 px-6 py-3 bg-[#43806c] hover:bg-[#2c5446] text-white rounded-xl font-Albula-Medium transition-all duration-300" >
                        Save Changes
                    </button>
                </div>
            );
        }

        return (
            <button onClick={handleEditClick} className="cursor-pointer w-full px-6 py-3 bg-[#43806c] hover:bg-[#2c5446] text-white rounded-xl font-Albula-Medium transition-all duration-300">
                Edit Information
            </button>
        );
    };

    if (isLoading) {
        return (
            <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 min-h-screen">
                <div className="max-w-[1000px] mx-auto">
                    <div className="bg-white rounded-2xl p-8 mb-2">
                        <p className="text-center text-gray-500">Loading profile...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 min-h-screen">
                <div className="max-w-[1000px] mx-auto">
                    <div className="bg-white rounded-2xl p-8 mb-2">
                        <p className="text-center text-gray-500">Please log in to view your profile.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-2xl p-8 mb-2">
                    <div className="flex items-center justify-center border-b pb-6">
                        <div className="flex items-center gap-6">
                            <img 
                                src={user?.picture || 'https://via.placeholder.com/80'} 
                                alt={user?.name || 'Profile'} 
                                className="w-20 h-20 rounded-full object-cover border-2 border-[#43806c]" 
                            />
                            <div>
                                <h1 className="text-2xl font-Albula-Heavy text-gray-800">
                                    {user?.given_name || ''} {user?.family_name || user?.name || 'User'}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-6">
                        {['personal', 'orders'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
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
                    <div className="bg-white rounded-2xl py-8 sm:p-8">
                        <div className="relative">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-Albula-Medium text-gray-800">Personal Information</h2>

                                    <span className={`px-2 py-1 text-sm rounded-lg ${
                                        formData.profileCompleted ? 'bg-green-50 font-Albula-Medium text-green-600': 'bg-red-50 font-Albula-Medium text-red-600' }`}>
                                        {formData.profileCompleted ? 'Profile Completed' : 'Incomplete Profile'}
                                    </span>

                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {personalDetails.map((field, index) => renderInputField(field, index))}
                                </div>

                                <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 font-Albula-Regular">Delivery Address</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addressDetails.map((field, index) => renderInputField(field, index))}
                                </div>

                                {renderActionButton()}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Profile;