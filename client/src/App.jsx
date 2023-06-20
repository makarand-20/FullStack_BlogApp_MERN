import './App.css'
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom'
import BlogsPage from './pages/BlogsPage'
import Login from './pages/Login'
import Register from './pages/Register'
import UserBlog from './pages/UserBlog'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <Header/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Routes>
        <Route path='/' element={<BlogsPage/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
        <Route path='/userblog' element={<UserBlog/>}/>
        <Route path='/updateblog/:id' element={<BlogDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
      </Routes>
    </>
  )
}

export default App
