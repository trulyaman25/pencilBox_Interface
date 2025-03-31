import React from 'react';
import { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaSnapchat, FaYoutube } from 'react-icons/fa';

import LandingBackdrop from '/landingBackground.jpg';
import CustomPortrait from '/products/custom_photo/Custom_Photo_1.jpg';
import LeafageArtOne from '/products/leafage_art/Leafage_Art_1.jpg';
import LeafageArtTwo from '/products/leafage_art/Leafage_Art_2.jpg';
import LeafageArtThree from '/products/leafage_art/Leafage_Art_3.jpeg';
import SahilNigam from '/teamMembers/Sahil_Nigam.jpg';
import exoticProducts from '../../data/exoticProducts.json';
import BookCallModal from '../../components/BookCallModal';
import SuccessModal from '../../components/SuccessModal';

function Home() {

    const [index, setIndex] = useState(0);
    const images = [LeafageArtOne, LeafageArtTwo, LeafageArtThree];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    
    const handleProductClick = () => {
        const element = document.getElementById("premiumCollection");
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };

    const handleBookingSuccess = () => {
        setShowSuccess(true);
        // Auto close after 5 seconds unless closed manually
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    };

    return (
        <>
            <main className="relative">
                <div id='home' className="relative w-full h-[100vh] pt-[80px]">
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
                                <div className='sm:border-2 sm:border-white p-1 sm:bg-white sm:rounded-full flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-8'>
                                    <NavLink onClick={handleProductClick} className="text-white text-md md:text-xl border-2 capitalize border-[#43806c] px-8 py-2 md:px-12 md:py-4 bg-[#43806c] hover:bg-[#379a79] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full">
                                        Shop Premium
                                    </NavLink>
                                    <NavLink 
                                        onClick={() => setIsModalOpen(true)} 
                                        className="text-white sm:text-black text-md md:text-xl border-2 capitalize border-[#43806c] px-8 py-2 md:px-12 md:py-4 hover:bg-[#43806c] hover:text-white text-center text-md font-Albula-Regular transition-all ease-in-out hover:cursor-pointer rounded-full"
                                    >
                                        Book a Call
                                    </NavLink>
                                </div>
                            </div>
                        </motion.h2>
                    </div>
                </div>

                <section id="premiumCollection">
                    <div className='w-full p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 bg-[#43806c]'>
                        <div className='text-3xl lg:text-4xl font-Albula-Heavy text-white text-center'>
                            Explore Our Premium Collection <span className='hidden md:inline'>of Handcrafted Masterpieces</span>
                        </div>
                    </div>

                    <motion.div className="w-full xl:h-[700px] p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 my-10" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                        <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center">
                            <div className="h-full sm:w-[500px] lg:w-[50%] flex flex-col justify-center items-center sm:items-start mt-10 sm:mt-20">
                                <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-2 xl:mb-4"> Handcrafted </h1>
                                <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-6"> Custom Portraits </h1>


                                <motion.p className="text-sm xl:text-lg text-center sm:text-start font-Albula-Regular text-gray-600" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} >
                                    Turn your cherished moments into timeless works of art. 
                                    <span className="font-Albula-SemiBold text-[#43806c] hover:cursor-pointer"> Mr. Sahil</span>, creates 
                                    stunning handmade portraits, capturing every detail with precision and passion.  
                                    Upload your photo, choose your style, and let us craft a masterpiece for you.
                                </motion.p>

                                <NavLink onClick={handleProductClick} className="w-fit h-fit font-Albula-Regular text-lg lg:text-xl text-white text-center text-md px-8 py-2 mt-8 xl:mt-10 border-2 border-[#43806c] bg-[#43806c] hover:bg-[#3b6c5d] transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Order Now
                                </NavLink>
                            </div>

                            <div className="max-w-[500px] h-full lg:w-[375px] lg:h-fit xl:w-[500px] xl:h-full">
                                <img src={CustomPortrait} alt="Custom Portrait" className="w-full h-full rounded-3xl object-cover shadow-lg hover:cursor-pointer"/>
                            </div>
                        </div>
                    </motion.div>

                    <div class="relative flex items-center justify-center my-6">
                        <span class="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></span>
                    </div>

                    <motion.div className="w-full xl:h-[700px] p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 mt-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                        <div className="w-full h-full flex flex-col-reverse lg:flex-row-reverse justify-between items-center">
                            <div className="h-full sm:w-[500px] lg:w-[50%] flex flex-col justify-center items-center sm:items-start mt-10 sm:mt-20">
                                <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-2 xl:mb-4 text-center">Exquisite <span className='text-[#64a48f]'>Leaf Art,</span></h1>
                                <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl mb-6 text-center">Carved on Demand!</h1>

                                <motion.p className="text-sm xl:text-lg text-center sm:text-start font-Albula-Regular text-gray-600" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} >
                                    Experience the elegance of Leafage Art, where your portrait is precisely 
                                    hand-carved on a delicate Peepal leaf by <span className="font-Albula-SemiBold text-[#43806c] hover:cursor-pointer">Mr. Sahil</span>. Each piece is custom-made on 
                                    demand, blending nature’s beauty with intricate craftsmanship to create 
                                    a luxurious, one-of-a-kind masterpiece—perfect for gifting or personal keepsakes.
                                </motion.p>

                                <NavLink onClick={handleProductClick} className="w-fit h-fit font-Albula-Regular text-lg lg:text-xl text-black text-center text-md px-8 py-2 mt-8 xl:mt-10 border-2 border-[#FED789] bg-[#FED789] hover:bg-[#ffcb62] hover:text-white transition-all ease-in-out hover:cursor-pointer rounded-full">
                                    Order Now
                                </NavLink>
                            </div>

                            <div className="max-w-[500px] h-full lg:w-[375px] lg:h-fit xl:w-[500px] xl:h-full">
                                <motion.img src={images[index]} alt="Custom Portrait" className="w-full h-full rounded-3xl object-cover shadow-lg hover:cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}/>
                            </div>
                        </div>
                    </motion.div>
                </section>


                <section id="exoticProducts">
                    <div className='w-full p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 mt-16 bg-[#43806c]'>
                        <div className='text-3xl lg:text-4xl font-Albula-Heavy text-white text-center'>
                            Explore Our Exotic Hand-Crafted Portraits!
                        </div>
                    </div>

                    <motion.div className="w-full min-h-[700px] p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 mt-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {exoticProducts.products.map((product) => (
                                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} >
                                    <NavLink to={`/product/${product.id}`} key={product.id} className="group relative bg-white overflow-hidden transition-all hover:cursor-pointer" >
                                        <div className="w-full max-h-[400px] overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full max-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>
                                    
                                        <h1 className="font-GoogleSans-Medium text-xl mt-7">{product.name}</h1>
                                    
                                        <div>
                                            <span className="font-GoogleSans-Medium text-gray-400 line-through mr-4"> ₹ {product.actualPrice} </span>
                                            <span className="font-GoogleSans-Medium text-gray-800"> ₹ {product.currentPrice} </span>
                                        </div>
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>
                
                <section id="aboutUs" className='mt-10'>
                    <div className='w-full p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 bg-[#43806c]'>
                        <div className='text-3xl lg:text-4xl font-Albula-Heavy text-white text-center'>
                            The Artistic Genius Behind PencilBox!
                        </div>
                    </div>

                    <motion.div className="w-full xl:h-[700px] p-5 sm:px-20 lg:px-28 xl:px-36 2xl:px-48 xl:p-10 my-10" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                        <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center">
                            <div className="h-full sm:w-[500px] lg:w-[50%] flex flex-col justify-center items-center sm:items-start mt-10 sm:mt-20">
                                <h1 className="font-Albula-Heavy text-3xl sm:text-4xl xl:text-5xl capitalize mb-6"> Sahil Nigam </h1>

                                <motion.p className="text-sm xl:text-lg text-center sm:text-start font-Albula-Regular text-gray-600" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} >
                                    Sahil Nigam is a talented 24-year-old artist known for his versatility in 
                                    creating unique and captivating artwork. With a passion for artistic 
                                    expression, he has built a strong online presence through his YouTube channel, 
                                    <span className='italic text-[#43806c] hover:cursor-pointer'> 'sahilnigam_art'</span> which boasts 2.4K subscribers and over 556,769 total views. 
                                    His creativity extends to Instagram, where he engages with a growing community 
                                    of 2.5K followers. Whether it's intricate sketches or innovative art styles, 
                                    Sahil’s work reflects his dedication to craftsmanship and storytelling, making 
                                    him a distinguished name in the art world.
                                </motion.p>

                                <div className='w-full flex flex-row justify-center sm:justify-start items-center gap-8 mt-10'>
                                    <a href="https://www.youtube.com/channel/UC5A9Z4mYSwokyyTnW44dJCg" target="_blank" rel="noopener noreferrer">
                                        <FaYoutube size={26} className='text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer'/>
                                    </a>

                                    <a href="https://www.instagram.com/sahilnigam_art/" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram size={26} className='text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer'/>
                                    </a>

                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <FaFacebookF size={26} className='text-[#43806c] hover:text-[#0b5c41] hover:cursor-pointer'/>
                                    </a>
                                </div>
                            </div>

                            <div className="max-w-[500px] h-full lg:w-[375px] lg:h-fit xl:w-[500px] xl:h-full">
                                <img src={SahilNigam} alt="Custom Portrait" className="w-full h-full rounded-3xl object-cover shadow-lg hover:cursor-pointer"/>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <BookCallModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleBookingSuccess}
            />
            <SuccessModal 
                isOpen={showSuccess} 
                onClose={() => setShowSuccess(false)} 
            />
        </>
    );
}

export default Home;