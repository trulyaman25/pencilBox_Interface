import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import productsData from "../../data/exoticProducts.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react";

const ProductDetail = () => {
    const { productID } = useParams();
    const { isAuthenticated, user } = useAuth0();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSection, setOpenSection] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [userExists, setUserExists] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserProfile = async () => {
            if (isAuthenticated && user?.sub) {
                try {
                    const response = await fetch(`https://pencilbox-server.onrender.com/api/profile/${user.sub}`);
                    const data = await response.json();
                    setUserExists(true);
                    setProfileCompleted(data.profileCompleted);
                    console.log(data);
                } catch (error) {
                    setUserExists(false);
                    setProfileCompleted(false);
                }
            }
        };
        checkUserProfile();
    }, [isAuthenticated, user]);

    useEffect(() => {
        const fetchProduct = () => {
            setLoading(true);
            const foundProduct = productsData.products.find((item) => item.id.toString() === productID);
            if (foundProduct) {
                setProduct(foundProduct);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [productID]);

    const handlePurchase = () => {
        if (selectedSize && selectedSize.purchaseLink) {
            window.location.href = selectedSize.purchaseLink;
        }
    };

    if (loading) return <h2 className="text-center p-4">Loading...</h2>;

    if (!product) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
                <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" >
                    Back to Products
                </button>
            </div>
        );
    }

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const getButtonState = () => {
        if (!isAuthenticated) {
            return {
                disabled: true,
                text: "Please login to continue",
                className: "bg-gray-200 cursor-not-allowed"
            };
        }
        if (!userExists) {
            return {
                disabled: true,
                text: "Complete your profile for shipping details",
                className: "bg-gray-200 cursor-pointer"
            };
        }
        if (!profileCompleted) {
            return {
                disabled: true,
                text: "Complete your profile for shipping details",
                className: "bg-gray-200 cursor-not-allowed"
            };
        }
        if (!selectedSize) {
            return {
                disabled: true,
                text: "Select a size to continue",
                className: "bg-gray-200 cursor-not-allowed"
            };
        }
        return {
            disabled: false,
            text: "Buy Now",
            className: "bg-[#FED685] hover:bg-[#ffb82b] cursor-pointer"
        };
    };

    const buttonState = getButtonState();

    return (
        <>
            <main className="relative pt-[50px] px-5 md:px-8 lg:px-10 xl:px-36 2xl:px-48 h-fit min-h-screen flex justify-center items-center">
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 justify-between transition-all ease-in-out mt-10">
                    <div className="w-full max-h-[calc(100vh-2rem)] flex justify-center items-center">
                        <div className="relative group flex flex-col justify-center items-center mt-10 lg:mt-5 mb-10">
                            <img src={product.image} alt={product.name} className="w-full h-fit max-h-[675px] max-w-[675px] object-cover shadow-md" />
                        </div>
                    </div>

                    <div className="w-full mt-[10px] max-w-[540px] lg:max-w-[840px] h-fit overflow-y-auto break-words transition-all ease-in-out">
                        <div className="flex flex-row justify-between items-center">
                            <span>
                                <h1 className="text-2xl md:text-3xl xl:text-4xl font-Albula-Bold uppercase">{product.name}</h1>
                                <p className="text-sm md:text-base lg:text-lg font-Albula-Medium text-gray-500 mt-2"> {product.category} </p>
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-Albula-Medium text-yellow-500">⭐ {product.reviews.rating}</span>
                            <span className="font-Albula-Medium text-gray-600">({product.reviews.count} reviews)</span>
                        </div>

                        <p className="text-sm md:text-base font-Albula-Regular text-gray-500 mt-6">{product.description}</p>

                        <div className="mt-8">
                            <label className="block text-lg font-Albula-Medium text-gray-800 mb-3">
                                Frame Size
                            </label>

                            <div className="relative group">
                                <select value={selectedSize?.id || ''} onChange={(e) => { const size = product.frameSizes.find(s => s.id === parseInt(e.target.value)); setSelectedSize(size); }} className="w-full px-6 py-3 bg-white appearance-none border-2 border-[#43806c] rounded-full  text-gray-800 font-Albula-Regular text-base cursor-pointer transition-all duration-300 hover:border-[#55937e] focus:outline-none focus:border-[#55937e] focus:ring-0 [&>option]:font-Albula-Regular [&>option]:py-2 [&>option]:px-4 [&>*]:bg-white [&>*]:text-gray-800 [&>*:hover]:bg-[#43806c] [&>*:hover]:text-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#43806c transparent' }} >
                                    <option value="" disabled className="font-Albula-Regular text-gray-400">
                                        Select frame size
                                    </option>
                                    {product.frameSizes.map((size) => (
                                        <option key={size.id} value={size.id} className="font-Albula-Regular py-4 hover:bg-[#43806c] hover:text-white cursor-pointer" >
                                            {size.size} - ₹{size.price.toLocaleString()}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#43806c] pointer-events-none transition-all duration-300 group-hover:text-[#55937e]" />
                            </div>
                        </div>

                        {selectedSize && (
                            <div className="mt-4 px-2 animate-fadeIn">
                                <div className="flex justify-between items-center p-3 bg-[#43806c]/10 rounded-xl">
                                    <span className="font-Albula-Regular text-gray-600">
                                        Selected Size: <span className="font-Albula-Medium text-[#43806c]">{selectedSize.size}</span>
                                    </span>
                                    <span className="font-Albula-Medium text-[#43806c]">
                                        ₹{selectedSize.price.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button 
                            id="buyButton"
                            className={`mt-8 w-full px-10 py-3 text-[#131313] capitalize rounded-full font-Albula-Regular text-lg transition-all duration-300 ${buttonState.className}`}
                            disabled={buttonState.disabled}
                            onClick={() => buttonState.disabled ? null : handlePurchase()}
                        >
                            {buttonState.text}
                        </button>

                        <div className="mt-6 mb-6 font-Albula-Bold">
                            {[ 
                                { label: "Materials", content: product.materials },
                                { 
                                    label: "Dimensions", 
                                    content: (
                                        <ul className="list-disc pl-5">
                                            {product.dimensions.map((dimension, index) => (
                                                <li key={index} className="mb-1">{dimension}</li>
                                            ))}
                                        </ul>
                                    )
                                },
                                { label: "Product Care", content: product.productCare },
                                { label: "Styling Tips", content: product.stylingTips },
                            ].map(({ label, content }) => (
                                <div key={label} className="border-b border-gray-200">
                                    <button onClick={() => toggleSection(label)} className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-all ease-in-out px-5" >
                                        <span className="text-base font-medium">{label}</span>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${ openSection === label ? "rotate-180" : "" }`} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-200 ${ openSection === label ? "max-h-96" : "max-h-0" }`}>
                                        <div className="pb-4 space-y-2 text-gray-700">
                                            {typeof content === 'string' ? (
                                                <p className="text-sm md:text-sm px-5 text-gray-500 font-Albula-Regular">{content}</p>
                                            ) : (
                                                <div className="text-sm md:text-sm px-5 text-gray-500 font-Albula-Regular">
                                                    {content}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetail;
