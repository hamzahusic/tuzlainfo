import AdminLayout from "./adminLayout";
import deleteIcon from '../assets/delete.png'
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {

    const [categories,setCategories] = useState([])
    const [name,setName] = useState("");

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    
    const getCategories = async () => {
        const request = await fetch('http://localhost:4003/category/');

        if(!request.ok){
            alert("Error getting categories");
            return;
        }

        const data = await request.json();
        console.log(data)
        setCategories(data.categories)
    }

    const handleAddBlog = async (e) => {
        e.preventDefault();

        if(name === ""){
            alert("Unesite ime kategorije!");
            return;
        }

        const request = await fetch('http://localhost:4003/category/',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "naziv" : name,
        })
       })

       if(!request.ok){
        alert("Greska prilikom kreiranja kategorije");
        return;
       }

       setName("");
       getCategories();

    }

    const handleDelete = async (e,idKategorija) => {
        e.preventDefault();

        if(!idKategorija){
            return;
        }

        const request = await fetch('http://localhost:4003/category/',{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id" : idKategorija,
        })
       })

       if(!request.ok){
        alert("Greska prilikom brisanja kategorije");
        return;
       }

       getCategories();

    }

    useEffect(() => {
        if(!user || user.uloga !== "admin"){
            navigate("/");
        }
        getCategories();
    },[])

    return ( 
        <AdminLayout>
            <h1 className="text-2xl tracking-wide pb-4 border-b-2 text-gray-700 border-gray-200">Dodaj kategoriju</h1>
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mt-4">
                        <input
                        type="email"
                        className="mt-1 block w-full focus:shadow-md p-2 border-[1px]"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <button
                        className="ml-2 bg-blue-600 hover:bg-blue-700 h-full text-white font-bold py-2 px-6 rounded relative top-[1.5px]"
                        onClick={handleAddBlog}
                        >
                        Dodaj
                        </button>
                    </div>

                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <colgroup>
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "70%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">ID Kategorije</th>
                            <th className="border border-gray-300 p-2">Naziv</th>
                            <th className="border border-gray-300 p-2">Izbriši</th>
                        </tr>
                        </thead>
                        <tbody> 
                            {categories.map((category) => (
                                <tr key={category.idKategorija}>
                                    <td className="border border-gray-300 p-2 text-center">{category.idKategorija}</td>
                                    <td className="border border-gray-300 p-2">{category.naziv}</td>
                                    <td className="border border-gray-300 p-2 flex justify-center">
                                        <button className="bg-red-600 flex items-center gap-2 px-4 py-2 text-white rounded tracking-wide hover:bg-red-700 transition-all"
                                         onClick={(e) => handleDelete(e,category.idKategorija)}
                                        >
                                        <img src={deleteIcon} alt="" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
        </AdminLayout>
     );
}
 
export default AddCategory;