import { useEffect, useState } from "react"
import networkLostImage from "../assets/images/networklost2.png"
export default function NoInternet() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [imageLoad, setImageLoading] = useState(false)
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {!isOnline &&
                <div className="flex flex-col justify-center items-center fixed bg-yellow-100 h-screen w-screen z-50">
                    <img className="w-44"
                        src={networkLostImage}
                        alt="networkLostImage"
                        onLoad={() => setImageLoading(true)}
                        style={{ display: imageLoad ? "block" : "none" }}
                    />
                    <h1 style={{ fontFamily: '"Numans", sans-serif' }} className="font-bold text-6xl text-red-">Oops!</h1>
                    <p style={{ fontFamily: '"Funnel Display", sans-serif' }} className="mt-6 text-lg text-gray-700">There is no internet connection</p>
                    <p style={{ fontFamily: '"Funnel Display", sans-serif' }} className="text-lg text-gray-700">Please check your connection</p>
                </div>}
        </>
    )
}