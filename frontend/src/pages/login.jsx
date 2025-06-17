import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion"
export default function Login() {
    const [passHide, setPassHide] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // use to store email
    const [pass, setPass] = useState(""); // use to store password
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [errorNotification, setErrorNotification] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home')
            }
        })
    }, [])

    useEffect(() => {
        if (errorNotification) {
            setErrorNotification("");
        }
    }, [email, pass]);


    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.(com|in|net|org|edu|gov|co|info)$/.test(email);
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);  // always set
        if (value.length === 0) {
            setEmailError(false);
        } else if (isValidEmail(value)) {
            setEmailError(false);
        } else {
            setEmailError(true)
        }
    };

    const handlePass = (e) => {
        setPass(e.target.value); // store password in state
        setPassError(false); // password length morethen 6 then remove error msg
        if (e.target.value.length === 0) {
            setPassError(false); // remove all letter then remove error msg
        } else if (e.target.value.length < 6) {
            setPassError(true); // password length lessthen 6 then show error msg
        }
    }

    const handleLogin = async () => {
        if (!email || !pass || passError || emailError) return;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            navigate('/home');
        } catch (error) {
            setErrorNotification("Login Failed! Please check your credentials");
        } finally {
            setLoading(false);
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
            <h1 className="font-bold text-purple-900 text-2xl md:text-4xl mb-1">Login</h1>
            <p className="mb-6 text-xs md:text-sm">Please log in to continue.</p>
            {/* Email Field */}
            <div className="mb-3 text-sm md:text-lg">
                <label htmlFor=".login-email" className="block font-medium mb-1">Email</label>
                <input
                    onChange={handleEmail}
                    type="text"
                    className="login-email border border-purple-200  outline-none rounded-lg px-2 py-3 w-full "
                    placeholder="Enter your email"
                />
                {emailError && <p className="text-xs md:text-sm text-red-500">Invalid email. Please try again with another</p>}
            </div>

            {/* Password Field with Toggle */}
            <div className="mb-5 relative text-sm md:text-lg">
                <label htmlFor=".login-password" className="block font-medium mb-1">Password</label>
                <input
                    onChange={handlePass}
                    onKeyDown={(e)=>e.key === "Enter" && handleLogin()}
                    type={passHide ? "text" : "password"}
                    className="login-password border border-purple-200  outline-none rounded-lg px-2 py-3 w-full "
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
                {/* password error msg */}
                {passError && <p className="text-xs md:text-sm text-red-500">Invalid password. Please try again</p>}
            </div>

            {/* Login Button */}
            <div className="flex justify-center items-center">
                <button
                    onClick={handleLogin}
                    disabled={!email || !pass}
                    className={`text-sm md:text-lg font-medium w-full py-2 rounded-lg ${!email || emailError || !pass || passError
                        ? "bg-purple-100 text-purple-400 cursor-not-allowed"
                        : "bg-gray-800 text-white"
                        }`}
                >
                    {loading ? (<>Login <i class="fa-solid fa-spinner fa-spin-pulse"/></>): "Login"}
                </button>
            </div>
            <div className="flex justify-center items-center mt-6 text-sm md:text-lg font-medium gap-2">
                <p className="text-gray-800">Don't have an account?</p>
                <button onClick={() => navigate('/signup')} className="text-purple-600 font-bold">Signup</button>
            </div>

        </>
    );
}
