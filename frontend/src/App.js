import Login from "./pages/login"
import Signup from "./pages/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/authlayout";
import Home from "./pages/home";
import NoInternet from "./pages/nointernet";
export default function App(){
  return(
    <Router>
        <NoInternet/>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home/>}/>
        <Route path="/online" element={<NoInternet/>}/>
      </Routes>
    </Router>
  )
}