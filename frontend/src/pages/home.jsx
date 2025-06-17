import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate = useNavigate();
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(!user){
                navigate('/');
            }
        })
    },[])
    return(
        <>
        <button onClick={()=>signOut(auth)}>SignOut</button>
        </>
    )
}