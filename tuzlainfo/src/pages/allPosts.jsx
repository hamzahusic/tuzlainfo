import { Link } from "react-router-dom";
import Category from "../components/category";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

const AllPosts = () => {

    const [allBlogs,setAllBlogs] = useState([]);
    const [copyBlogs,setCopyBlogs] = useState([]);
        
    const getAllBlogs = async () => {
        const request = await fetch("http://localhost:4003/objava/all");
        
        if(!request.ok){
            alert("Greska prilikom dobijanja svih blogova");
            return;
        }
        
        const data = await request.json();
        console.log(data);
        setAllBlogs(data.Data);
        setCopyBlogs(data.Data);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getAllBlogs();
    },[])

    return (
        <div>
            <Navbar/>
                <div className="main-container text-base" id="najnovije">
                    <h1 className="text-3xl tracking-[5px] mb-8">TuzlaInfo: Sve o Tuzli na jednom mjestu!</h1>

                    <Category sortBlogs={setAllBlogs} allBlogs={copyBlogs}/>

                    <div className="flex flex-col gap-8 mb-32">
                        {allBlogs && allBlogs.map((blog) => (
                            <Link key={blog.idObjava} to={`/blog/${blog.idObjava}`} className='flex text-center md:text-left flex-col md:flex-row gap-10 bg-[#F5F5F5] p-5 rounded-[20px]'>
                                <img src={`/uploads/${blog.putanja_slike}`} alt="" className='md:max-w-[350px] lg:max-w-[400px] w-full rounded-md object-cover'/>
                                <div className='flex flex-col justify-evenly'>
                                    <h3 className=' text-xl lg:text-2xl font-medium tracking-wider'>{blog.naslov}</h3>
                                    <p className=' text-base lg:text-lg text-justify py-4 md:py-0'>{blog.sadrzaj.substring(0,350) + "..."}</p>
                                    <p className=' text-base md:text-lg'>{blog.ime + " " + blog.prezime} - {new Date(blog.datum_objave).toDateString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                </div>
            <Footer/>
        </div>
     );
}
 
export default AllPosts;