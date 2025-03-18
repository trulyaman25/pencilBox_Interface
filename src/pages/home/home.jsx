import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingBackdrop from '/landingBackground.jpg';
import CustomPortrait from '/products/custom_photo/Custom_Photo_1.jpg';

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
                            Crafting <span className='font-Albula-Heavy'>Custom Portraits</span> That Turn Your Memories into Art.
                        </motion.h2>

                        <motion.h2 className="w-full text-white text-center text-lg sm:text-xl md:text-2xl font-Albula-Light mt-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} >
                            <div className='flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-8 lg:mt-5'>
                                <NavLink onClick={handleProductClick} className="text-black text-md md:text-xl border-2 capitalize border-[#FED685] px-8 py-2 md:px-12 md:py-4 bg-[#FED685] hover:bg-[#ffb82b] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Shop Now
                                </NavLink>
                                <NavLink className="text-white text-md md:text-xl border-2 capitalize border-[#43806c] px-8 py-2 md:px-12 md:py-4 hover:bg-[#43806c] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Book a Call
                                </NavLink>
                            </div>
                        </motion.h2>
                    </div>
                </div>

                <div id="custom-portrait" className="w-full xl:h-[700px] p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 mt-16 transition-all ease-in-out">
                    <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center">
                        <div className="h-full sm:w-[500px] lg:w-[50%] flex flex-col justify-center items-center sm:items-start mt-10 sm:mt-20">
                            <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-2 xl:mb-4"> Handcrafted </h1>
                            <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-6"> Custom Portraits </h1>

                            <p className="text-sm xl:text-lg text-center sm:text-start font-Albula-Regular text-gray-600">
                                Turn your cherished moments into timeless works of art. 
                                <span className="font-Albula-SemiBold text-[#43806c]"> Sahil</span>, creates 
                                stunning handmade portraits, capturing every detail with precision and passion.  
                                Upload your photo, choose your style, and let us craft a masterpiece for you.
                            </p>

                            <NavLink onClick={handleProductClick} className="w-fit h-fit font-Albula-Regular text-lg lg:text-xl text-white text-center text-md px-8 py-2 mt-8 xl:mt-10 border-2 border-[#43806c] bg-[#43806c] hover:bg-[#3b6c5d] transition-all ease-in-out hover:cursor-pointer rounded-full">
                                Order Now
                            </NavLink>
                        </div>

                        <div className="max-w-[500px] h-full lg:w-[375px] lg:h-fit xl:w-[500px] xl:h-full">
                            <img src={CustomPortrait} alt="Custom Portrait" className="w-full h-full rounded-3xl object-cover shadow-lg"/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;