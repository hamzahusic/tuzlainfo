import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const BlogPost = () => {

    
    const {blogId} = useParams();
    const [blog,setBlog] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const getBlogData = async () => {
        const request = await fetch(`http://localhost:4003/objava/one/${blogId}`);

        if(!request.ok){
            alert("Greska prilikom dobijanja objave");
            navigate("/admin/all/blog");
        }
        const data = await request.json();

        const blogData = data.data[0];

        if(data.data.length === 0){
            navigate("/admin/all/blog");
        }

        console.log(blogData)
        setBlog(blogData);
        setIsLoading(false)
    }

    const splitIntoParagraphs = (text,sentencesPerParagraph) => {
        const paragraphs = text.split(/\n\s*\n/);
        const paragraphsWithSentences = paragraphs.map(paragraph => splitIntoSentences(paragraph));

        let resultParagraphs = [];
        let currentParagraph = '';

        for (const paragraph of paragraphsWithSentences) {
            for (const sentence of paragraph) {
                if (currentParagraph.split('.').length <= sentencesPerParagraph) {
                    currentParagraph += sentence + ' ';
                } else {
                    resultParagraphs.push(currentParagraph.trim());
                    currentParagraph = sentence + ' ';
                }
            }
            if (currentParagraph.trim() !== '') {
                resultParagraphs.push(currentParagraph.trim());
            }
            currentParagraph = '';
        }
        return resultParagraphs;
    }

    const splitIntoSentences = (paragraph) => {
        return paragraph.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getBlogData();
    },[])

    return ( 
        <div>
            <Navbar/>
            <div className="main-container">
                {isLoading && 
                    <div className="flex items-center justify-center w-full h-[50vh]">
                        <ClipLoader size={50} color="#00000"/>
                    </div>
                }
                {!isLoading &&
                    <>
                        <h1 className=" text-xl md:text-3xl tracking-[5px]">{blog && blog.naslov}</h1>
                        <p className=" text-base mt-8 mb-3 tracking-[5px]">#{blog && blog.naziv_kategorije}</p>
                        <img src={blog && `/uploads/${blog.putanja_slike}`} alt="" className="max-w-[1200px] w-full max-h-[500px] h-full object-cover rounded-md"/>

                        <div className="flex justify-between gap-4 md:gap-0 flex-col-reverse md:flex-row md:items-center mt-7 mb-12">
                            <div className=" lg:text-xl flex flex-col gap-1 lg:gap-3 tracking-[5px]">
                                <p>Autor : {blog && (blog.ime + " " + blog.prezime)}</p>
                                <p>Objavljeno : {blog && new Date(blog.datum_objave).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className=" mb-[200px] text-justify text-lg flex flex-col gap-5">
                            {blog && blog.sadrzaj && splitIntoParagraphs(blog.sadrzaj,5).map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </>
                }
            </div>
            <Footer/>
        </div>
     );
}
 
export default BlogPost;