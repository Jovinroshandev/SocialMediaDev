import { Outlet } from "react-router-dom";
import MDImageBanner from "../assets/images/SocialMediaMdBanner.png";
import HeaderImage from "../assets/images/socialMediaHeaderLogin.png";

export default function AuthLayout() {
    return (
        <div className="flex flex-col bg-gray-100 min-h-screen">
            {/* Mobile view */}
            <div className="md:hidden">
                <img src={HeaderImage} alt="Header" className="w-full" />
                <div className="mx-6 my-8">
                    <Outlet />
                </div>
                <div className="w-full h-16 bg-[#644C94]" />
            </div>

            {/* Laptop / Medium+ View */}
            <div className="hidden md:flex justify-center items-center min-h-screen p-6">
                <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Left Side Image */}
                    <div className="w-1/2">
                        <img
                            src={MDImageBanner}
                            alt="BannerImage"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Side Form */}
                    <div className="w-1/2 px-10 flex items-center justify-center">
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
