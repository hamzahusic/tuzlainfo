import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Hero = ({blog, isLoading}) => {

    return (
        <div className="main-container">
            <h1 className="text-2xl pb-[20px] tracking-wide">Saznajte najnovije vijesti na našem portalu</h1>
            <div className="img-grid">
                <div className="big-pic relative max-h-[525px]">
                    {!isLoading && <Link to={blog.length !==0 ? `/blog/${blog[0].idObjava}` : '/'} className="absolute top-0 bottom-0 left-0 right-0 bg-black/30"></Link>}
                    {isLoading && blog.length===0 &&
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex bg-black/30 justify-center items-center ">
                        <ClipLoader loading color={"#ffffff"} size={50}/>
                    </div>
                    }
                    <img src={blog.length !==0 && `/uploads/${blog[0].putanja_slike}`} alt="" className="md:h-[525px] md:w-[650px] overflow-hidden object-cover" />
                    <div className="absolute bottom-[50px] left-4">
                        <p className=" bg-white px-4 py-1 relative bottom-2 tracking-wide z-10 text-lg inline rounded-xl">{blog.length !==0 && blog[0].naziv_kategorije}</p>
                        <p className=" text-white z-10 text-xl">{blog.length !==0 && blog[0].naslov}  </p>
                    </div>
                    <p className="absolute bottom-4 left-4 text-white z-10 text-base">{blog.length !==0 && (blog[0].ime + " " + blog[0].prezime)} - {blog.length !==0 && new Date(blog[0].datum_objave).toDateString()}</p>
                </div>
                <div className="small-pic-1 relative">
                    {!isLoading && <Link to={blog.length !==0 ? `/blog/${blog[1].idObjava}` : '/'} className="absolute top-0 bottom-0 left-0 right-0 bg-black/30"></Link>}
                    {isLoading && blog.length===0 &&
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex bg-black/30 justify-center items-center ">
                        <ClipLoader loading color={"#ffffff"} size={50}/>
                    </div>
                    }
                    <img src={blog.length !==0 && `/uploads/${blog[1].putanja_slike}`} alt="" className="md:h-[250px] md:w-[550px] overflow-hidden object-cover" />
                    <div className="absolute bottom-[35px] md:bottom-[50px] left-4">
                        <p className=" bg-white px-4 py-1 relative bottom-2 tracking-wide z-10 text-base inline rounded-xl">{blog.length !==0 && blog[1].naziv_kategorije}</p>
                        <p className=" text-white z-10 text-base md:text-xl leading-6 sm:leading-normal h-[2em] overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis w-full sm:h-auto">{blog.length !==0 && blog[1].naslov}</p>
                    </div>
                    <p className="absolute bottom-4 left-4 text-white z-10 text-xs md:text-base">{blog.length !==0 && (blog[1].ime + " " + blog[1].prezime)} - {blog.length !==0 && new Date(blog[1].datum_objave).toDateString()}</p>
                </div>
                <div className="small-pic-2 relative">
                    {!isLoading && <Link to={blog.length !==0 ? `/blog/${blog[2].idObjava}` : '/'} className="absolute top-0 bottom-0 left-0 right-0 bg-black/30"></Link>}
                    {isLoading && blog.length===0 &&
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-20 flex bg-black/30 justify-center items-center ">
                        <ClipLoader loading color={"#ffffff"} size={50}/>
                    </div>
                    }
                    <img src={blog.length !==0 && `/uploads/${blog[2].putanja_slike}`} alt="" className="md:h-[250px] md:w-[550px] overflow-hidden object-cover" />
                    <div className="absolute bottom-[35px] md:bottom-[50px] left-4">
                        <p className=" bg-white px-4 py-1 relative bottom-2 tracking-wide z-10 text-base inline rounded-xl">{blog.length !==0 && blog[2].naziv_kategorije}</p>
                        <p className=" text-white z-10 text-base md:text-xl leading-6 sm:leading-normal h-[2em] overflow-hidden whitespace-nowrap sm:whitespace-normal text-ellipsis w-full sm:h-auto">{blog.length !==0 && blog[2].naslov}</p>
                    </div>
                    <p className="absolute bottom-4 left-4 text-white z-10 text-xs md:text-base">{blog.length !==0 && (blog[2].ime + " " + blog[2].prezime)} - {blog.length !==0 && new Date(blog[2].datum_objave).toDateString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
