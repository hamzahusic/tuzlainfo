import { Link } from 'react-router-dom';
import arrowIcon from '../assets/right.png'

const LatesNews = ({blog}) => {

    const img = "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    return ( 
        <div className="main-container mb-[70px]">
            <div className="flex items-center justify-between mb-9">
                <h2 className="text-2xl md:text-3xl tracking-[2px] sm:tracking-[5px]">Najnovije vijesti</h2>
                <Link to="/all" className='flex items-center gap-2 tracking-wider text-base sm:text-lg underline'>pogledaj više
                    <img src={arrowIcon} alt="" width={20}/>
                </Link>
            </div>
            <div className='flex flex-col gap-8'>

                <Link to={blog.length !==0 ? `/blog/${blog[3].idObjava}` : '/'} className='flex text-center md:text-left flex-col md:flex-row gap-10 bg-[#F5F5F5] p-5 rounded-[20px]'>
                    <img src={blog.length !==0 ? `/uploads/${blog[3].putanja_slike}` : img} alt="" className='md:max-w-[350px] lg:max-w-[400px] w-full rounded-md object-cover'/>
                    <div className='flex flex-col justify-evenly'>
                        <h3 className=' text-xl lg:text-2xl font-medium tracking-wider'>{blog.length !==0 && blog[3].naslov}</h3>
                        <p className=' text-base lg:text-lg text-justify py-4 md:py-0'>{blog.length !==0 && blog[3].sadrzaj.substring(0,300)}</p>
                        <p className=' text-base md:text-lg'>{blog.length !==0 && (blog[3].ime + " " + blog[3].prezime)} - {blog.length !==0 && new Date(blog[3].datum_objave).toDateString()}</p>
                    </div>
                </Link>

                <Link to={blog.length !==0 ? `/blog/${blog[4].idObjava}` : '/'} className='flex text-center md:text-left flex-col md:flex-row gap-10 bg-[#F5F5F5] p-5 rounded-[20px]'>
                    <img src={blog.length !==0 ? `/uploads/${blog[4].putanja_slike}` : img} alt="" className='md:max-w-[350px] lg:max-w-[400px] w-full rounded-md object-cover'/>
                    <div className='flex flex-col justify-evenly'>
                        <h3 className=' text-xl lg:text-2xl font-medium tracking-wider'>{blog.length !==0 && blog[4].naslov}</h3>
                        <p className=' text-base lg:text-lg text-justify py-4 md:py-0'>{blog.length !==0 && blog[4].sadrzaj.substring(0,300)}</p>
                        <p className=' text-base md:text-lg'>{blog.length !==0 && (blog[4].ime + " " + blog[4].prezime)} - {blog.length !==0 && new Date(blog[4].datum_objave).toDateString()}</p>
                    </div>
                </Link>

                <Link to={blog.length !==0 ? `/blog/${blog[5].idObjava}` : '/'} className='flex text-center md:text-left flex-col md:flex-row gap-10 bg-[#F5F5F5] p-5 rounded-[20px]'>
                    <img src={blog.length !==0 ? `/uploads/${blog[5].putanja_slike}` : img} alt="" className='md:max-w-[350px] lg:max-w-[400px] w-full rounded-md object-cover'/>
                    <div className='flex flex-col justify-evenly'>
                        <h3 className=' text-xl lg:text-2xl font-medium tracking-wider'>{blog.length !==0 && blog[5].naslov}</h3>
                        <p className=' text-base lg:text-lg text-justify py-4 md:py-0'>{blog.length !==0 && blog[5].sadrzaj.substring(0,300)}</p>
                        <p className=' text-base md:text-lg' id="popularno">{blog.length !==0 && (blog[5].ime + " " + blog[5].prezime)} - {blog.length !==0 && new Date(blog[5].datum_objave).toDateString()}</p>
                    </div>
                </Link>

            </div>
        </div>
     );
}
 
export default LatesNews;