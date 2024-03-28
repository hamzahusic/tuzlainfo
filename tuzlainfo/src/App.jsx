import { createContext, useState } from 'react';
import './App.css'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from './pages/blogPost';
import LogIn from './pages/login';
import Register from './pages/register';
import AllPosts from './pages/allPosts';
import AddBlog from './components/addBlog';
import EditBlog from './components/editBlog';
import AllBlogs from './components/allBlogs';
import AddAdmin from './components/addAdmin';
import AddCategory from './components/addCategory';
import NotFound from './components/404';
import UserContext from './context/userContext'

function App() {

  const [user,setUser] = useState({})
  
  return (
    <UserContext.Provider value={{user,setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/blog/:blogId" element={<BlogPost/>} />
            <Route path="/all" element={<AllPosts/>} />
            <Route path="/login" element={<LogIn/>} />
            <Route path="/register" element={<Register/>} />
            <Route path='/admin/add/blog' element={<AddBlog/>} />
            <Route path="/admin/all/blog" element={<AllBlogs/>}/>
            <Route path="/admin/edit/blog/:id" element={<EditBlog/>} />
            <Route path='/admin/add/user' element={<AddAdmin/>} />
            <Route path='/admin/add/category' element={<AddCategory/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
