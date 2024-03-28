import { Link } from 'react-router-dom';
import arrowIcon from '../assets/right.png'

const PopularNews = ({blog}) => {

    const img = "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    return ( 
        <div className="main-container mb-[160px]">
            <div className="flex items-center justify-between mb-9">
                <h2 className="text-2xl md:text-3xl tracking-[2px] sm:tracking-[5px]">Popularno</h2>
                <Link to="/all" className='flex items-center gap-2 tracking-wider text-lg underline'>pogledaj više
                    <img src={arrowIcon} alt="" width={20}/>
                </Link>
            </div>
            <div className='flex gap-8 md:flex-row xl:gap-0 justify-center xl:justify-between flex-wrap'>
                <Link to={blog.length !==0 ? `/blog/${blog[1].idObjava}` : '/'}>
                    <div className='max-w-[370px] bg-[#F5F5F5] p-5 rounded-[20px]'>
                        <img src={blog.length !==0 ? `/uploads/${blog[1].putanja_slike}` : img} alt="" className='max-w-[330px] w-full rounded-md'/>
                        <div className='pt-3'>
                            <h2 className=' text-lg font-semibold'>{blog.length !==0 && blog[1].naslov.substring(0,70) + ".."}</h2>
                            <p className='pt-3 pb-6'>{blog.length !==0 && blog[1].sadrzaj.substring(0,130) + "..."}</p>
                            <p className=' tracking-widest font-normal'>#{blog.length !==0 && blog[1].naziv_kategorije}</p>
                        </div>
                    </div>
                </Link>

                <Link to={blog.length !==0 ? `/blog/${blog[0].idObjava}` : '/'}>
                    <div className='max-w-[370px] bg-[#F5F5F5] p-5 rounded-[20px]'>
                        <img src={blog.length !==0 ? `/uploads/${blog[0].putanja_slike}` : img} alt="" className='max-w-[330px] w-full rounded-md'/>
                        <div className='pt-3'>
                            <h2 className=' text-lg font-semibold'>{blog.length !==0 && blog[0].naslov.substring(0,70) + ".."}</h2>
                            <p className='pt-3 pb-6'>{blog.length !==0 && blog[0].sadrzaj.substring(0,130).substring(0,130) + "..."}</p>
                            <p className=' tracking-widest font-normal'>#{blog.length !==0 && blog[0].naziv_kategorije}</p>
                        </div>
                    </div>
                </Link>

                <Link to={blog.length !==0 ? `/blog/${blog[2].idObjava}` : '/'}>
                    <div className='max-w-[370px] bg-[#F5F5F5] p-5 rounded-[20px]'>
                        <img src={blog.length !==0 ? `/uploads/${blog[2].putanja_slike}` : img} alt="" className='max-w-[330px] w-full rounded-md'/>
                        <div className='pt-3'>
                            <h2 className=' text-lg font-semibold'>{blog.length !==0 && blog[2].naslov.substring(0,70) + ".."}</h2>
                            <p className='pt-3 pb-6'>{blog.length !==0 && blog[2].sadrzaj.substring(0,130).substring(0,130) + "..."}</p>
                            <p className=' tracking-widest font-normal'>#{blog.length !==0 && blog[2].naziv_kategorije}</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
     );
}
 
export default PopularNews;