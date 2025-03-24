import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../../globalStyles.css';

const Orders = () => {
    const { user, isAuthenticated } = useAuth0();
    const [activeTab, setActiveTab] = useState('orders');
    const [formData, setFormData] = useState({
        profileCompleted: false
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.sub) {
                try {
                    const response = await fetch(`http://localhost:5000/api/profile/${user.sub}`);
                    if (!response.ok) throw new Error('Failed to fetch profile data');
                    const data = await response.json();
                    setFormData(prev => ({
                        ...prev,
                        ...data
                    }));
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        fetchUserProfile();
    }, [user]);

    const handleTabChange = (tab) => {
        if (tab === 'personal') {
            window.location.href = '/profile';
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <main className="relative pt-[100px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 min-h-screen">
            <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-2xl p-8 mb-2">
                    <div className="flex items-center justify-center border-b pb-6">
                        <div className="flex items-center gap-6">
                            <img src={user?.picture} alt={user?.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#43806c]" />
                            <div>
                                <h1 className="text-2xl font-Albula-Heavy text-gray-800">{user?.given_name} {user?.family_name}</h1>
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

                <div className="bg-white rounded-2xl p-8 mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-Albula-Medium text-gray-800">Order History</h2>
                            <span className={`px-2 py-1 text-sm rounded-lg ${
                                formData.profileCompleted 
                                    ? 'bg-green-50 font-Albula-Medium text-green-600'
                                    : 'bg-red-50 font-Albula-Medium text-red-600'
                            }`}>
                                {formData.profileCompleted ? 'Profile Completed' : 'Incomplete Profile'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 font-Albula-Regular">No orders yet</p>
                        <a 
                            href="/products" 
                            className="px-6 py-2 text-[#43806c] font-Albula-Medium mt-4 hover:text-[#376857]"
                        >
                            Browse Products
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Orders;
