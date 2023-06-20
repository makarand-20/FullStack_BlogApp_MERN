import {AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin)
  isLogin = isLogin || localStorage.getItem('userId')
  const dispatch = useDispatch()
  console.log(isLogin);
  const navigate = useNavigate()

  const [value, setValue] = useState()

  // handle logout
  const handleLogout = () => {
    try {
      localStorage.removeItem('userId')
      dispatch(authActions.logout())
      toast.success('Logout Successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppBar position='sticky'>
      <Toolbar>

          <Typography variant='h5'>
            My Blog App
          </Typography>

          {isLogin && (
            <Box display={'flex'} marginLeft={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
              <Tab label='blogs' LinkComponent={Link} to='/blogs'/>
              <Tab label='My Blogs' LinkComponent={Link} to='/userblog'/>
              <Tab label='Create Blog' LinkComponent={Link} to='/createblog'/>
            </Tabs>
          </Box>
          )}

          <Box display={'flex'} marginLeft={'auto'}>
            {!isLogin && (<>
              <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to='/login'>Login</Button>
              <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to='/register'>Register</Button>
            </>)}
            {isLogin && (
              <Button onClick={handleLogout} sx={{margin:1, color:'white'}}>Logout</Button>
            )}
          </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Header