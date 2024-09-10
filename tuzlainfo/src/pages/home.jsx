import { useEffect, useState } from "react";
import Category from "../components/category";
import Footer from "../components/footer";
import Hero from "../components/hero";
import LatesNews from "../components/latestNews";
import Navbar from "../components/navbar";
import PopularNews from "../components/popularNews";

const Home = () => {

    const [allBlogs,setAllBlogs] = useState([]);
    const [isLoading,setLoading] = useState(false)

    const getAllBlogs = async () => {
        setLoading(true)
        const request = await fetch("http://localhost:4003/objava/all");
        
        if(!request.ok){
            alert("Greska prilikom dobijanja svih blogova");
            return;
        }
        
        const data = await request.json();
        console.log(data.Data);
        setAllBlogs(data.Data);
        setLoading(false)
    }

    useEffect(() => {
        getAllBlogs();
    },[])

    return ( 
        <div>
            <Navbar />
            <Hero blog={allBlogs} isLoading={isLoading}/>
            <Category/>
            <LatesNews blog={allBlogs} isLoading={isLoading}/>
            <PopularNews blog={allBlogs} isLoading={isLoading}/>
            <Footer/>
        </div>
     );
}
 
export default Home;