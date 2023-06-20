import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://fullstackblogapp-svnd.onrender.com/api/users/login/", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        localStorage.setItem("userId", data?.user.id);
        dispatch(authActions.login());
        //create a toast message
        toast.success('Login Successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login Page 🚀
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            New here? Please Register 👈
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
