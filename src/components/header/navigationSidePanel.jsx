import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from '/logo/PencilBox_Logo_3.png';

function ProfileNavPanel({setProfile}) {
    const {isAuthenticated, logout} = useAuth0();
    const panelRef = useRef();

    const handleLogOut = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        setProfile(false);
    }
    
    const handleClose = () => {
        setProfile(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setProfile]);

    return (
        <div className="fixed inset-0 bg-opacity-50 z-50 animate-fadeIn">
            <div ref={panelRef} className='fixed flex flex-col justify-between items-center w-full sm:w-[400px] h-screen right-0 bg-white text-black z-10 gap-8 shadow-2xl animate-slideIn'>
                <section>
                    <img src={Logo} alt="Pencil Box Logo" className='w-[200px] h-[200px] cursor-pointer' />
                </section>

                <section className='flex flex-col justify-center items-center w-full gap-8'>
                    <Link to="/profile" onClick={handleClose} className='text-2xl font-Albula-Medium capitalize text-[#131313] hover:text-[#43806c] transform transition-all duration-300' >
                        View Profile
                    </Link>

                    <button onClick={handleLogOut} className='text-2xl font-Albula-Medium capitalize hover:cursor-pointer text-rose-400 hover:text-rose-600 transform transition-all duration-300' > 
                        Log Out 
                    </button>

                </section>

                <section className='pb-20'>
                    <button onClick={handleClose} className='text-2xl font-Albula-Medium capitalize hover:cursor-pointer text-gray-500 hover:text-gray-700 transform transition-all duration-300' > 
                        Close 
                    </button>
                </section>
            </div>
        </div>
    )
}

export default ProfileNavPanel