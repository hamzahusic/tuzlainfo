import { useEffect, useState } from "react";

const Category = ({sortBlogs,allBlogs}) => {

    const [categories,setCategories] = useState([])

    const handleClick = (category) => {
        if(category === "sve"){
            sortBlogs(allBlogs)
            return;
        }
        console.log(allBlogs)
        sortBlogs(allBlogs)
        sortBlogs(allBlogs.filter((blog) => blog.naziv_kategorije == category))
    }

    const getCategories = async () => {
        const request = await fetch('http://localhost:4003/category/');

        if(!request.ok){
            alert("Error getting categories");
            return;
        }

        const data = await request.json();

        console.log(data.categories)

        if(sortBlogs){
            setCategories(data.categories.slice(0,4))
        }
        else{
            setCategories(data.categories.slice(0,5))
        }

    }

    useEffect(() => {
        getCategories();
    },[])

    return ( 
        <div className="main-container text-base" id="najnovije">
            <div className="flex flex-col md:flex-row bg-[#F5F5F5] py-3 rounded-xl mt-10 mb-16 px-5 items-center gap-2">
                <p className="md:w-[30%] font-semibold">Popularne kategorije : </p>
                <div className="flex min-[450px]:justify-between items-center w-full lg:px-10 flex-wrap gap-2 md:gap-0">
                    {sortBlogs && <button onClick={() => {sortBlogs && handleClick("sve")}}>#sve</button>}
                    {categories && categories.map((category) => (
                        <button key={category.idKategorija} onClick={() => {sortBlogs && handleClick(category.naziv)}}>#{category.naziv}</button>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Category;