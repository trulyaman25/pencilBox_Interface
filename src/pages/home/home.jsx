import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingBackdrop from '/landingBackground.jpg';

function Home() {
    
    const handleProductClick = () => {
        const element = document.getElementById("products");
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <main className="relative">
                <div id='home' className="relative w-full h-[100vh] pt-[100px]">
                    <img src={LandingBackdrop} alt="Background Texture" className="w-full h-full object-cover -z-10 filter brightness-60" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center px-5 mt-14">
                        <motion.h1 className="w-full uppercase text-white text-center text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl font-Albula-Heavy" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} >
                            Pencil Box
                        </motion.h1>

                        <motion.h2 className="w-full text-white text-center text-lg sm:text-xl md:text-2xl font-Albula-Light mt-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} >
                            Crafting Custom Portraits That Turn Your Memories into Art.
                        </motion.h2>

                        <motion.h2 className="w-full text-white text-center text-lg sm:text-xl md:text-2xl font-Albula-Light mt-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} >
                            <div className='flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-8 mt-10'>
                                <NavLink onClick={handleProductClick} className="text-black text-md md:text-xl border-2 capitalize border-[#FED685] px-8 py-2 md:px-12 md:py-4 bg-[#FED685] hover:bg-[#ffb82b] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Shop Now
                                </NavLink>
                                <NavLink onClick={handleProductClick} className="text-white text-md md:text-xl border-2 capitalize border-[#43806c] px-8 py-2 md:px-12 md:py-4 hover:bg-[#43806c] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Request a Call
                                </NavLink>
                            </div>
                        </motion.h2>

                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;