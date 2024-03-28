const Footer = () => {
    return ( 
        <div className="bg-[#e9e9e9]">
            <div className="main-container">
                <div className=" text-center pt-20 pb-[120px]">
                    <h2 className="text-2xl md:text-3xl max-w-[600px] mx-auto">Saznajte prvi, živite najbolje: Vaš vodič kroz gradska dešavanja!</h2>
                    <p className=" mt-4 mb-8">Imate priču ili pitanje? Kontaktirajte nas</p>
                    <a href="mailto:tuzlainfo@gmail.com" className="bg-black text-white md:text-xl px-10 md:px-20 py-5 rounded-xl tracking-[3px]">tuzlainfo@gmail.com</a>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center border-t-[1px] border-black">
                    <div className="flex items-center gap-2 md:gap-12 py-3 sm:py-7 tracking-[1px]">
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                        <a href="#">Facebook</a>
                    </div>
                    
                    <a href="#" className="tracking-[1px] pb-4 sm:pb-0">Pravila korištenja</a>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;