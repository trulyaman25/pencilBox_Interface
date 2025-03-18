import '../../globalStyles.css';

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Logo from '/logo/PencilBox_Logo_3.png'
import UserOutlineIcon from '/icons/userOutlineIcon.png';
import UserFilledIcon from '/icons/userFilledIcon.png';
import MenuIcon from '/icons/menuIcon.png';
import CloseIcon from '/icons/closeIcon.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userIcon, setUserIcon] = useState(UserOutlineIcon);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    };

    const NavigationPanel = () => (
        
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center space-y-6">
            <img src={Logo} alt="Pencil Box Logo" className='w-[200px] h-[200px] fixed top-[0px]'/>
            <Link to="/" className="text-2xl font-Albula-Medium text-black">
                Home
            </Link>
            <Link to="/products" className="text-2xl font-Albula-Medium text-black">
                Products
            </Link>
            <Link to="/about" className="text-2xl font-Albula-Medium text-black">
                About Us
            </Link>
            <Link to="/contact" className="text-2xl font-Albula-Medium text-black">
                Contact Us
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4">
                <img src={CloseIcon} alt="Close Menu" className="w-[30px] h-[30px]" />
            </button>
        </div>
    );

    return (
        <>
            <div className="fixed w-full h-[100px] z-10 flex flex-row justify-between items-center py-1 px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 transition-all duration-300 ease-in-out">
                <button className="scale-50 lg:hidden" onClick={() => setIsMenuOpen(true)}>
                    <img src={MenuIcon} alt="Navigation Menu Icon" className="w-[50px] h-[50px]" />
                </button>

                <section className="w-[196px] flex flex-row justify-center items-center gap-7">
                    <Link to="/" className="flex flex-col justify-evenly items-start">
                    <img src={Logo} alt="Pencil Box Logo" className="w-[120px] h-[120px]"/>
                        {/* <h1 className="font-GoogleSans-Black text-4xl text-black">
                            PENCIL BOX
                        </h1> */}
                    </Link>
                </section>

                <section className="hidden lg:flex flex-row justify-center items-center gap-10">
                    <Link to="/" className="font-Albula-Medium relative group text-black">
                        <span>Home</span>
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/products" className="font-Albula-Medium relative group text-black">
                        <span>Products</span>
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/about" className="font-Albula-Medium relative group text-black">
                        <span>About Us</span>
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link to="/contact" className="font-Albula-Medium relative group text-black">
                        <span>Contact Us</span>
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </section>

                <section className="w-[50px] lg:w-[196px] flex flex-row justify-center lg:justify-end items-center gap-7">
                    <button className="hover:cursor-pointer">
                        <img 
                            src={userIcon} 
                            alt="User Profile Icon" 
                            className="w-[25px] h-[25px]"
                            onMouseEnter={() => setUserIcon(UserFilledIcon)}
                            onMouseLeave={() => setUserIcon(UserOutlineIcon)}
                            onClick={handleProfileClick}
                        />
                    </button>
                    <div className="hidden lg:block">
                        {!isAuthenticated ? (
                            <button 
                            onClick={() => loginWithRedirect()} 
                            className="font-Albula-Medium relative group hover:text-[#55937e] transition-all ease-in-out hover:cursor-pointer text-[#131313]"
                            >
                                Sign In
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-600 group-hover:w-full"></span>
                            </button>
                        ) : (
                            <button 
                                onClick={() => logout({ returnTo: window.location.origin })} 
                                className="font-Albula-Medium relative group hover:text-rose-700 transition-all ease-in-out hover:cursor-pointer text-rose-400"
                            >
                                Log Out
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-rose-700 transition-all duration-600 group-hover:w-full"></span>
                            </button>
                        )}
                    </div>
                </section>
            </div>

            {isMenuOpen && <NavigationPanel />}
        </>
    );
}

export default Header;