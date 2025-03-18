import '../../globalStyles.css';
import Logo from '/logo/PencilBox_Logo_5_Light.png';
import { FaInstagram, FaFacebookF, FaTwitter, FaEnvelope } from 'react-icons/fa';

function Footer() {
    return (
        <footer className='w-full bg-[#43806c] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 py-10 sm:py-16 text-white font-Albula-Regular'>
            <div className='flex flex-col lg:flex-row justify-between items-center border-b border-gray-300 pb-10'>
                <div className='flex flex-col items-center lg:items-start lg:w-[550px] xl:w-[650px] 2xl:w-[750px] max-w-[800px] mb-12 sm:mb-6'>
                    <img src={Logo} alt="Pencil Box Logo" className='w-[300px] -ml-3 mb-16 sm:mb-6'/>
                    <p className='leading-relaxed text-center md:text-start'>
                        At <span className='font-Albula-Medium'>Pencil Box</span>, we bring your memories to life with exquisite handmade portraits. Each 
                        piece is meticulously crafted with passion, precision, and artistic dedication. Our goal 
                        is to transform your cherished moments into timeless works of art that you can treasure forever.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-12 mt-10 text-center md:text-left'>
                    <div>
                        <h3 className='font-Albula-ExtraBold text-xl mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li><a href='/' className='hover:underline'>About Us</a></li>
                            <li><a href='/' className='hover:underline'>Products</a></li>
                            <li><a href='/' className='hover:underline'>Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-Albula-ExtraBold text-xl mb-4'>Support</h3>
                        <ul className='space-y-2'>
                            <li><a href='/' className='hover:underline'>FAQs</a></li>
                            <li><a href='/' className='hover:underline'>Shipping & Returns</a></li>
                            <li><a href='/' className='hover:underline'>Terms & Conditions</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center mt-10 text-base'>
                <p className='text-center md:text-start'>&copy; {new Date().getFullYear()} <span className='font-Albula-Heavy'>Pencil Box</span>. All rights reserved. Where creativity meets craftsmanship.</p>
                <div className='flex space-x-6 mt-6 md:mt-0'>
                    <a href='#' className='hover:text-gray-300'><FaInstagram size={26} /></a>
                    <a href='#' className='hover:text-gray-300'><FaFacebookF size={26} /></a>
                    <a href='#' className='hover:text-gray-300'><FaTwitter size={26} /></a>
                    <a href='mailto:contact@pencilbox.com' className='hover:text-gray-300'><FaEnvelope size={26} /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
