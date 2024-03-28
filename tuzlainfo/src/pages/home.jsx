import { useEffect, useState } from "react";
import Category from "../components/category";
import Footer from "../components/footer";
import Hero from "../components/hero";
import LatesNews from "../components/latestNews";
import Navbar from "../components/navbar";
import PopularNews from "../components/popularNews";

const Home = () => {

    const [allBlogs,setAllBlogs] = useState([]);

    const getAllBlogs = async () => {
        const request = await fetch("http://localhost:4003/objava/all");
        
        if(!request.ok){
            alert("Greska prilikom dobijanja svih blogova");
            return;
        }
        
        const data = await request.json();
        console.log(data.Data);
        setAllBlogs(data.Data);
    }

    useEffect(() => {
        getAllBlogs();
    },[])

    return ( 
        <div>
            <Navbar />
            <Hero blog={allBlogs}/>
            <Category/>
            <LatesNews blog={allBlogs}/>
            <PopularNews blog={allBlogs}/>
            <Footer/>
        </div>
     );
}
 
export default Home;