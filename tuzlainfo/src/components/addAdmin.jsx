import { useContext, useEffect, useState } from "react";
import AdminLayout from "./adminLayout";
import deleteIcon from '../assets/delete.png'
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {

      const [users, setUsers] = useState([]);
      const [email, setEmail] = useState("");
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

      const {user} = useContext(UserContext);
      const navigate = useNavigate();
      
      const handleAddClick = async () => {
        
        if(!email ){
            alert("Unesite email korisnika!");
            return;
       }
    
       const request = await fetch('http://localhost:4003/user/admin',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email" : email,
            })
       })
    
       if(!request.ok){
        alert("Greska prilikom dodavanja korisnika") 
        return;
       }

       setEmail("");
       getUsers();
        
      };

      const getUsers = async () => {
        const request = await fetch('http://localhost:4003/user/all');

        if(!request.ok){
            alert("Error getting users");
            return;
        }

        const data = await request.json();
        console.log(data)
        setUsers(data.users)
      }

      const revokeAdmin = async (email) => {
        const request = await fetch('http://localhost:4003/user/admin',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email" : email,
                "revoke" : true
            })
       })
    
       if(!request.ok){
        alert("Greska prilikom mijenjanja uloge") 
        return;
       }

       getUsers();
      }

      const deleteUser = async (email) => {

        if(user.email === email){
            alert("Trenutno ste logovani na nalog koji zelite izbrisati!");
            return;
        }

        const request = await fetch('http://localhost:4003/user/',{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email" : email,
            })
       })
    
       if(!request.ok){
        alert("Greska prilikom brisanja korisnika") 
        return;
       }

       getUsers();
      } 

    useEffect(() => {
        if(!user || user.uloga !== "admin"){
            navigate("/");
        }
        getUsers();
    },[])

    return ( 
        <AdminLayout>
            <h1 className="text-2xl tracking-wide pb-4 border-b-2 text-gray-700 border-gray-200">Dodaj admina</h1>
            <div className="container mx-auto">
                <div className="flex justify-center items-center mt-4">
                    <input
                    type="email"
                    className="mt-1 block w-full focus:shadow-md p-2 border-[1px]"
                    placeholder="Enter user email"
                    value={email}
                    onChange={handleEmailChange}
                    />
                    <button
                    className="ml-2 bg-blue-600 hover:bg-blue-700 h-full text-white font-bold py-2 px-6 rounded relative top-[1.5px]"
                    onClick={handleAddClick}
                    >
                    Dodaj
                    </button>
                </div>

                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <colgroup>
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                    </colgroup>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Korisnik</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Uloga</th>
                            <th className="border border-gray-300 p-2">Promjena</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email}>
                                <td className="border border-gray-300 p-2">{user.ime + " " + user.prezime}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.uloga}</td>
                                <td className="border border-gray-300 p-2 flex gap-3 justify-center">
                                    <button className="bg-red-600 flex items-center gap-2 px-4 py-2 text-white rounded tracking-wide hover:bg-red-700 transition-all"
                                        onClick={() => deleteUser(user.email)}
                                    >
                                        <img src={deleteIcon} alt="" />
                                        Delete
                                    </button>
                                    <button className="bg-blue-600 flex items-center gap-2 px-4 py-2 text-white rounded tracking-wide hover:bg-blue-700 transition-all"
                                        onClick={() => revokeAdmin(user.email)}
                                    >
                                        <img src={deleteIcon} alt="" />
                                        Revoke admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
     );
}
 
export default AddAdmin;