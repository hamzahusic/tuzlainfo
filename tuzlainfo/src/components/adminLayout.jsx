import { Link, useNavigate } from "react-router-dom";
import addIcon from '../assets/add.png'
import editIcon from '../assets/edit.png'
import { useContext } from "react";
import UserContext from '../context/userContext'
const AdminLayout = ({children}) => {

    const {user,setUser} = useContext(UserContext)
    const navigate = useNavigate();

    return ( 
        <div className="flex">
            <div className="bg-gray-900 text-white p-2 sm:p-5 min-h-screen sm:max-w-[250px] w-full flex flex-col justify-between">
                <div>
                    <Link to="/" className="second-font text-[25px] tracking-widest flex justify-center">Tuzla info</Link>
                    <div className="mt-8 flex flex-col gap-6 tracking-wide">
                        <div className="bg-gray-800 p-4 rounded-md">
                            <p className="mb-3 text-base sm:text-lg">Objava : </p>
                            <div className="flex flex-col gap-2 text-sm sm:text-base">
                                <Link to={"/admin/add/blog"} className="hover:bg-gray-600 sm:pl-3 py-2 rounded transition-all duration-300 flex items-center gap-2">
                                    <img src={addIcon} alt="" />
                                    Dodaj objavu
                                </Link>
                                <Link to={"/admin/all/blog"} className="hover:bg-gray-600 sm:pl-3 py-2 rounded transition-all duration-300 flex items-center gap-2">
                                    <img src={editIcon} alt="" />
                                    Sve objave
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-md">
                            <p className="mb-3 text-base sm:text-lg">Korisnik (Admin) : </p>
                            <div className="flex flex-col gap-2 text-sm sm:text-base">
                                <Link to={"/admin/add/user"} className="hover:bg-gray-600 sm:pl-3 py-2 rounded transition-all duration-300 flex items-center gap-2">
                                    <img src={addIcon} alt="" />
                                    Dodaj admina
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-md">
                            <p className="mb-3 text-base sm:text-lg" >Kategorija : </p>
                            <div className="flex flex-col gap-2 text-sm sm:text-base">
                                <Link to={"/admin/add/category"} className="hover:bg-gray-600 sm:pl-3 py-2 rounded transition-all duration-300 flex items-center gap-2">
                                    <img src={addIcon} alt="" />
                                    Dodaj kategoriju
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-md tracking-widest text-sm sm:text-[15px]">
                    <div>
                        <p>{user.ime + " " + user.prezime}</p>
                        <p>{user.email}</p>
                    </div>
                    <button className="w-full mt-2 border-2 py-2 rounded hover:bg-gray-600 transition-all duration-300"
                     onClick={() => { setUser({}); navigate("/")}}
                    >Log Out
                    </button>
                </div>
            </div>
            <div className="p-5 w-screen">
                {children}
            </div>
        </div>
     );
}
 
export default AdminLayout;