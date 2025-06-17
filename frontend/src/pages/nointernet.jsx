import { useEffect, useState } from "react"
import networkLostImage from "../assets/images/networklost2.png"
export default function NoInternet(){
    const [ isOnline , setIsOnline ] = useState(navigator.onLine)
    useEffect(()=>{
       window.addEventListener("online",()=>setIsOnline(true))
       window.addEventListener("offline",()=>setIsOnline(false))
       return()=>{
        window.removeEventListener('online',()=>setIsOnline(true))
        window.removeEventListener('offline',()=>setIsOnline(false))
       }
    },[])
    return(
        <>
        {isOnline && 
        <div className="flex flex-col justify-center items-center fixed bg-yellow-100 h-screen w-screen z-50">
            <img className="w-44" src={networkLostImage} alt="networkLostImage" />
            <h1 style={{fontFamily:'"Numans", sans-serif'}} className="font-bold text-6xl text-red-">Oops!</h1>
            <p style={{fontFamily:'"Funnel Display", sans-serif'}} className="mt-6 text-lg text-gray-700">There is no internet connection</p>
            <p style={{fontFamily:'"Funnel Display", sans-serif'}} className="text-lg text-gray-700">Please check your connection</p>
        </div>}
        </>
    )
}