import AdminLayout from "./adminLayout";
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";


const AllBlogs = () => {
    const [allBlogs,setAllBlogs] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const getAllBlogs = async () => {
        const request = await fetch("http://localhost:4003/objava/all");
        
        if(!request.ok){
            alert("Greska prilikom dobijanja svih blogova");
            return;
        }
        
        const data = await request.json();
        console.log(data);
        setAllBlogs(data.Data);
    }

    const handleDelete = async (idObjava,ime_slike) => {

        const request = await fetch('http://localhost:4003/objava/',{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "idObjava" : idObjava,
                "ime_slike" : ime_slike
            })
        })

        if(!request.ok){
            alert("Greska prilikom brisanja objave!");
            return;
        }
        getAllBlogs();
    }

    useEffect(() => {
        if(!user || user.uloga !== "admin"){
            navigate("/");
        }
        getAllBlogs();
    },[])

    return ( 
        <AdminLayout>
            <h1 className="text-2xl tracking-wide pb-4 border-b-2 text-gray-700 border-gray-200">Sve objave</h1>
            <div>
                {allBlogs && allBlogs.map((blog) => (
                    <div className="flex gap-3 p-5 hover:shadow-sm flex-col md:flex-row" key={blog.idObjava}>
                        <div className="flex flex-col lg:flex-row gap-3">
                            <img src={`/uploads/${blog.putanja_slike}`} alt="" className="max-w-[100px] object-cover"/>
                            <div className="flex flex-col justify-evenly">
                                <h2 className="font-semibold">{blog.naslov}</h2>
                                <p className="max-w-[1100px]">{blog.sadrzaj.substring(0,350) + "..."}</p>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5 items-center">
                            <Link to={`/admin/edit/blog/${blog.idObjava}`} className="bg-blue-500 flex items-center gap-2 px-4 py-2 text-white rounded tracking-wide hover:bg-blue-500/80 transition-all">
                                <img src={editIcon} alt="" />
                                Edit
                            </Link>
                            <button 
                                onClick={() => handleDelete(blog.idObjava,blog.putanja_slike)}
                                className="bg-red-500 flex items-center gap-2 px-4 py-2 text-white rounded tracking-wide hover:bg-red-500/80 transition-all">
                                <img src={deleteIcon} alt="" />
                                Delete
                            </button>
                        </div>
                    </div>   
                ))}
            </div>
        </AdminLayout>
     );
}
 
export default AllBlogs;