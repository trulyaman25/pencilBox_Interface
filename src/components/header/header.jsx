import '../../globalStyles.css';

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Logo from '/logo/PencilBox_Logo_4.png'
import UserOutlineIcon from '/icons/userOutlineIcon.png';
import UserFilledIcon from '/icons/userFilledIcon.png';
import MenuIcon from '/icons/menuIcon.png';
import ProfileNavPanel from './navigationSidePanel.jsx';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userIcon, setUserIcon] = useState(UserOutlineIcon);
    const [profile, setProfile] = useState(false);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleProfileClick = () => {
        if(isAuthenticated){
            setProfile(true);
        } else {
            loginWithRedirect();
        }
    }

    

    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = (event, sectionId) => {
        event.preventDefault();
        setIsMenuOpen(false);
    
        if (location.pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                const yOffset = -80;
                const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        } else {
            navigate('/');
            setTimeout(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const yOffset = -80;
                    const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const NavigationPanel = () => (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-between space-y-8 py-20">
            <section>
                <img src={Logo} alt="Pencil Box Logo" className='w-[210px] h-[80px]'/>
            </section>

            <section className='flex flex-col items-center justify-evenly space-y-8'>
                <Link to="/" onClick={(e) => handleScroll(e, "home")}  className="text-2xl font-Albula-Medium text-black hover:text-[#43806c] transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `0ms` }} >
                    Home
                </Link>

                <Link to="#premiumCollection" onClick={(e) => handleScroll(e, "premiumCollection")}  className="text-2xl font-Albula-Medium text-black hover:text-[#43806c] transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `100ms` }} >
                    Premium Products
                </Link>

                <Link to="#exoticProducts" onClick={(e) => handleScroll(e, "exoticProducts")}  className="text-2xl font-Albula-Medium text-black hover:text-[#43806c] transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `100ms` }} >
                    Exotic Products
                </Link>

                <Link to="#aboutUs" onClick={(e) => handleScroll(e, "aboutUs")}  className="text-2xl font-Albula-Medium text-black hover:text-[#43806c] transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `200ms` }} >
                    About Us
                </Link>

                <Link to="/contact" onClick={() => setIsMenuOpen(false)}  className="text-2xl font-Albula-Medium text-black hover:text-[#43806c] transform hover:scale-110 transition-all duration-300" style={{ animationDelay: `300ms` }} >
                    Contact Us
                </Link>
            </section>

            
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl font-Albula-Medium text-rose-400 hover:text-[#43806c] transform hover:scale-110 transition-all duration-300">
                Close
            </button>
        </div>
    );

    return (
        <>
            <div className="fixed w-full h-[80px] z-10 flex flex-row justify-between items-center py-1 px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 transition-all duration-300 ease-in-out bg-white">
                <button className="scale-50 xl:hidden" onClick={() => setIsMenuOpen(true)}>
                    <img src={MenuIcon} alt="Navigation Menu Icon" className="w-[50px] h-[50px]" />
                </button>

                <section className="w-fit flex flex-row justify-center items-center gap-7">
                    <Link to="/" className="flex flex-col justify-evenly items-start">
                        <img src={Logo} alt="Pencil Box Logo" className="w-[150px] h-[56px] sm:w-[171px] sm:h-[64px]"/>
                    </Link>
                </section>

                <section className="hidden xl:flex flex-row justify-center items-center gap-10">
                    <NavLink to="/" onClick={(e) => handleScroll(e, "home")} className="font-Albula-Medium relative group text-black overflow-hidden">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#43806c]">Home</span>
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#43806c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>

                    <NavLink to="#premiumCollection" onClick={(e) => handleScroll(e, "premiumCollection")} className="font-Albula-Medium relative group text-black overflow-hidden">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#43806c]">Premium Products</span>
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#43806c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>

                    <NavLink to="#exoticProducts" onClick={(e) => handleScroll(e, "exoticProducts")} className="hidden font-Albula-Medium 2xl:inline relative group text-black overflow-hidden">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#43806c]">Exotic Products</span>
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#43806c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>

                    <NavLink to="#aboutUs" onClick={(e) => handleScroll(e, "aboutUs")} className="font-Albula-Medium relative group text-black overflow-hidden">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#43806c]">About Us</span>
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#43806c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>

                    <NavLink to="/contact" className="font-Albula-Medium relative group text-black overflow-hidden">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#43806c]">Contact Us</span>
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#43806c] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>
                </section>

                <section className="w-[50px] xl:w-[196px] flex flex-row justify-center lg:justify-end items-center gap-7">
                    <button className="hover:cursor-pointer transform transition-all duration-300">
                        <img src={userIcon} alt="User Profile Icon" className="w-[25px] h-[25px]"onMouseEnter={() => setUserIcon(UserFilledIcon)}onMouseLeave={() => setUserIcon(UserOutlineIcon)}onClick={handleProfileClick} />
                    </button>

                    <div className="hidden xl:block">
                        {!isAuthenticated ? (
                            <button onClick={() => loginWithRedirect()} className="font-Albula-Medium relative group hover:text-[#55937e] transition-all duration-300 hover:cursor-pointer text-[#131313] transform" >
                                Sign In
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#43806c] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ) : (
                            <button onClick={() => logout({ returnTo: window.location.origin })} className="font-Albula-Medium relative group transition-all duration-300 hover:cursor-pointer text-rose-400 hover:text-rose-600 transform" >
                                Log Out
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-rose-600 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        )}
                    </div>
                </section>
            </div>

            {profile && <ProfileNavPanel profile={profile} setProfile={setProfile} />}

            {isMenuOpen && <NavigationPanel />}
        </>
    );
}

export default Header;