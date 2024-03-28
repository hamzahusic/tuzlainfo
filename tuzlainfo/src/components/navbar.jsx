import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext"
const Navbar = () => {

    const [isNavOpen,setIsNavOpen] = useState(false);

    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user)
        console.log(Object.keys(user))
    },[])
    return (
        <div>
            {/*DESKTOP NAVBAR*/}
            <div className="hidden lg:flex p-14 items-center justify-between lg:text-base xl:text-xl tracking-[5px]">
                <div className="flex gap-10 items-center">
                    <a href="#najnovije">Najnovije vijesti</a>
                    <a href="#popularno">Popularno</a>
                </div>
                <div className=" lg:text-3xl xl:text-4xl">
                    <Link to="/" className="second-font">Tuzla info</Link>
                </div>
                <div className="flex gap-10 items-center">
                    {(Object.keys(user).length !== 0) && user.uloga === "admin" && <Link to="/admin/add/blog">Dodaj objavu</Link>}
                    {!(Object.keys(user).length !== 0) && <Link to="/register">Register</Link>}
                    {!(Object.keys(user).length !== 0) && <Link to="/login" className=" bg-black text-white py-4 px-9 rounded">Log In</Link>}
                    {(Object.keys(user).length !== 0) && <button onClick={() => { setUser({}); navigate("/")}} className=" bg-black text-white py-4 px-9 rounded">Log Out</button>}
                </div>
            </div>
            {/*MOBILE NAVBAR*/}
            <div className="p-5 lg:hidden">

                <div className="text-3xl flex justify-between items-center">
                    <Link to="/" className="second-font">Tuzla info</Link>
                    <button className="text-base md:text-lg second-font" onClick={() => setIsNavOpen(!isNavOpen)}>MENU</button>
                </div>
                    
                {isNavOpen && 
                <div className="nav-anm">
                    <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                    <li className="border-b border-gray-400 my-8 uppercase relative hover:bottom-1">
                        <a href="#najnovije">Najnovije vijesti</a>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase relative hover:bottom-1">
                        <a href="#popularno">Popularno</a>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase relative hover:bottom-1">
                        {(Object.keys(user).length !== 0) && user.uloga === "admin" && <Link to="/admin/add/blog">Dodaj objavu</Link>}
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase relative hover:bottom-1">
                        {!(Object.keys(user).length !== 0) && <Link to="/login" className=" bg-black text-white py-4 px-9 rounded">Log In</Link>}
                        {(Object.keys(user).length !== 0) && <button onClick={() => { setUser({}); navigate("/")}} className=" bg-black text-white py-4 px-9 rounded">Log Out</button>}
                    </li>
                    </ul>
                </div>}
            
            </div>
        </div>
     );
}
 
export default Navbar;