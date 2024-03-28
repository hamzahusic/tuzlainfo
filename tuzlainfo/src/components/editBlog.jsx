import { useContext, useEffect, useState } from "react";
import AdminLayout from "./adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/userContext";

const EditBlog = () => {
    const [src, setSrc] = useState();//Img preview
    const [naslov,setNaslov] = useState("");
    const [kategorija,setKategorija] = useState(1);
    const [sadrzaj,setSadrzaj] = useState("");
    const [slika, setSlika] = useState(null);
    const [stara_slika,setStaraSlika] = useState("");

    const [categories,setCategories] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!naslov || !sadrzaj || (!slika && !stara_slika) || !kategorija) {
            alert("Unesite sve informacije!");
            console.log(naslov,sadrzaj,slika,stara_slika,kategorija)
            return;
        }

        const formData = new FormData();
        formData.append("naslov", naslov);
        formData.append("sadrzaj", sadrzaj);
        formData.append("datum_objave", new Date().toISOString().slice(0, 19).replace('T', ' '));
        formData.append("putanja_slike", slika);
        formData.append("kategorija", kategorija);
        formData.append("stara_slika",stara_slika);
        formData.append("idObjava",id);

        const request = await fetch('http://localhost:4003/objava/', {
            method: "PUT",
            body: formData
        });

        if (!request.ok) {
            alert("Doslo je do greske");
            return;
        }

        navigate("/admin/all/blog");
      };

      const getCategories = async () => {
        const request = await fetch('http://localhost:4003/category/');

        if(!request.ok){
            alert("Error getting categories");
            return;
        }

        const data = await request.json();
        console.log(data)
        setCategories(data.categories)
    }

      const handleImg = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSlika(file)
          const reader = new FileReader();
          reader.onload = () => {
            setSrc(reader.result); // Update the source with the selected image
          };
          reader.readAsDataURL(file);
        }
      };

      const getBlogData = async () => {
        const request = await fetch(`http://localhost:4003/objava/one/${id}`);

        if(!request.ok){
            alert("Greska prilikom dobijanja objave");
            navigate("/admin/all/blog");
        }
        const data = await request.json();

        const blogData = data.data[0];

        if(data.data.length === 0){
            navigate("/admin/all/blog");
        }

        console.log(data.data[0]);

        setSrc(`/uploads/${blogData.putanja_slike}`);
        setStaraSlika(blogData.putanja_slike);
        setKategorija(blogData.kategorija);
        setNaslov(blogData.naslov);
        setSadrzaj(blogData.sadrzaj);
      }

      useEffect(() => {
        if(!user || user.uloga !== "admin"){
            navigate("/");
        }
        getCategories();
        getBlogData();
      },[])

    return ( 
        <AdminLayout>
            <h1 className="text-2xl tracking-wide pb-4 border-b-2 text-gray-700 border-gray-200">Izmijeni objavu</h1>
            <div className="max-w-5xl mx-auto p-6 mt-16 bg-white rounded shadow">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium text-gray-700">
                        Naslov <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={naslov}
                        onChange={(e) => setNaslov(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="options" className="block font-medium text-gray-700">
                        Kategorija <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="options"
                        name="options"
                        value={kategorija}
                        onChange={(e) => setKategorija(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {categories && categories.map(category => (
                            <option value={category.idKategorija} key={category.idKategorija}>{category.naziv}</option>
                        ))
                        }
                    </select>
                </div>
                <div className="mb-4">
                <label htmlFor="patternValidation" className="block font-medium text-gray-700">
                    Sadržaj <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="patternValidation"
                    name="patternValidation"
                    value={sadrzaj}
                    onChange={(e) => setSadrzaj(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                </div>
                <div className="mb-4">
                <label htmlFor="validationMessage" className="block font-medium text-gray-700">
                    Slika <span className="text-red-500">*</span>
                </label>
                <input
                    type="file"
                    id="validationMessage"
                    name="validationMessage"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImg}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                </div>
                {src && <img src={src} alt="slika" className="max-w-sm mb-4"/>}
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                Izmijeni objavu
                </button>
            </form>
            </div>
        </AdminLayout>
     );
}
 
export default EditBlog;