import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
export default function Signup() {
    const [email, setEmail] = useState(""); // use to store email
    const [pass, setPass] = useState(""); // use to store password
    const [confirmPass, setConfirmPass] = useState("");
    const [passHide, setPassHide] = useState(false); // manage password hide/ show
    const [confirmPassHide, setConfirmPassHide] = useState(false);  // manage confirm password hide/ show
    const [passError, setPassError] = useState(false); // manage password error msg
    const [ConfirmPassError, setConfirmPassError] = useState(false); // manage confirm password error msg
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); // this react hook help to navigate another page or route
    const [ emailError, setEmailError ] = useState(false)
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.(com|in|net|org|edu|gov|co|info)$/.test(email);
    };
    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);  // always set
        if (value.length === 0) {
            setEmailError(false);
        }else if(isValidEmail(value)) {
            setEmailError(false);
        }else{
            setEmailError(true)
        }
    };
    const handlePassword = (e)=>{
        setPass(e.target.value); // store password in state
        setPassError(false); // password length morethen 6 then remove error msg
        if (e.target.value.length === 0){
            setPassError(false); // remove all letter then remove error msg
        }else if(e.target.value.length < 6){
            setPassError(true); // password length lessthen 6 then show error msg
        }
    }

    const handleConfrimPassword = (e)=>{
        setConfirmPassError(false); // password matched means remove error msg
        if (e.target.value.length === 0){ 
            setConfirmPassError(false); // remove all letter then remove error msg
        }else if(pass !== e.target.value){
            setConfirmPassError(true); // password and confrim password not matched then show error
        }
        setConfirmPass(e.target.value)
    }

    const handleSubmit = async()=> {
        setLoading(true);
        try{
            await createUserWithEmailAndPassword(auth, email, pass); // use to create user
            setSuccessNotification(true)
            signOut(auth);
           setTimeout(()=>{
             navigate("/") // user creation is success then redirect or navigate to login page
           },3000)
          
        }
        catch(e){
             if (e.code === "auth/email-already-in-use") {
                    setErrorNotification("This email is already in use. Try logging in.");
                } else {
                    setErrorNotification("Signup failed: " + e.message);
                }
        }
    };

    return (
        <>
            {errorNotification && <motion.p
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300
                }}
                className="absolute top-24 right-2 md:top-8 md:right-48  bg-red-200 text-red-600 p-3 rounded-md drop-shadow-md  text-xs md:text-sm">{errorNotification}</motion.p>}
            {successNotification && <motion.p
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300
                }}
                className="absolute top-24 right-2 md:top-8 md:right-48  bg-green-200 text-green-600 p-3 rounded-md drop-shadow-md  text-xs md:text-sm">User Created Successfully!</motion.p>}
            <h1 className="font-bold text-purple-900 text-2xl md:text-4xl mb-1">Signup</h1>
            <p className="mb-6 text-xs md:text-sm">Please Signup to create account</p>

            {/* Email */}
            <div className="mb-3 text-sm md:text-lg">
                <label htmlFor=".email" className="block font-medium mb-1">
                    Email
                </label>
                <input
                    onChange={handleEmail}
                    type="text"
                    className="email border border-purple-200  outline-none rounded-lg px-2 py-3 w-full "
                    placeholder="Enter your email"
                />
                { emailError && <p className="text-xs md:text-sm text-red-500">Invalid email. Please try again with another</p>}
            </div>

            {/* Password */}
            <div className="mb-3 relative text-sm md:text-lg">
                <label htmlFor=".password" className="block font-medium mb-1">Password</label>
                <input
                    onChange={handlePassword}
                    type={passHide ? "text" : "password"}
                    className="password border border-purple-200  outline-none rounded-lg px-2 py-3 w-full "
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    onClick={() => setPassHide(!passHide)}
                    className="absolute right-3 top-9 md:top-11 text-lg md:text-xl text-purple-600 hover:underline"
                >
                    {passHide ? (
                        <i className="fa-regular fa-eye" />
                    ) : (
                        <i className="fa-regular fa-eye-slash" />
                    )}
                </button>
            {passError && <p className="text-red-500 text-xs md:text-sm">Password minimum 6 character require</p>}
            </div>
            {/* Confirm Password */}
            <div className="mb-5 relative text-sm md:text-lg">
                <label htmlFor=".confirm-password" className="block font-medium mb-1">Confirm Password</label>
                <input
                onChange={handleConfrimPassword}
                onKeyDown={e=>e.key === "Enter" && handleSubmit()}
                    type={confirmPassHide ? "text" : "password"}
                    className="confirm-password border border-purple-200  outline-none rounded-lg px-2 py-3 w-full "
                    placeholder="Enter your password again"
                />
                <button
                    type="button"
                    onClick={() => setConfirmPassHide(!confirmPassHide)}
                    className="absolute right-3 top-9 md:top-11 text-lg md:text-xl text-purple-600 hover:underline"
                >
                    {confirmPassHide ? (
                        <i className="fa-regular fa-eye" />
                    ) : (
                        <i className="fa-regular fa-eye-slash" />
                    )}
                </button>
            {ConfirmPassError && <p className="text-red-500 text-xs md:text-sm">Password not match. Please try again</p>}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={!email || !pass || !confirmPass || passError || ConfirmPassError}
                    className={`text-sm md:text-lg font-medium w-full py-2 rounded-lg ${
                        !email || emailError || !pass || !confirmPass || passError || ConfirmPassError
                            ? "bg-purple-100 text-purple-400 cursor-not-allowed"
                            : "bg-gray-800 text-white"
                    }`}
                >
                    Signup
                </button>
            </div>
            <div className="flex justify-center mt-6 text-sm md:text-lg font-medium gap-2">
                <p className="text-gray-800">Already have an account?</p>
                <button onClick={()=>navigate('/')} className="text-purple-600 font-bold">Login</button>
            </div>
        </>
    );
}
