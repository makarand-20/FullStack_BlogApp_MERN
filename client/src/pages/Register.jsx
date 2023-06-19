import { useState } from "react"
import {Box, Button, TextField, Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
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
      const { data } = await axios.post("http://localhost:5001/api/users/register/", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        //create a toast message
        toast.success("Registered Successfully");
        navigate('/login');
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
          Register Page 📝
        </Typography>
        <TextField
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type={"text"}
          required
        />
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
          Register
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
            Already Registerd?  Please Login 👈
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Register