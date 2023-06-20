import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PropTypes from 'prop-types';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BlogCard(props){
  const { title, description, image, username, time, id, isUserBlog} = props;

  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/updateblog/${id}`);
  };
  
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`https://fullstackblogapp-svnd.onrender.com/api/blogs/deleteblog/${id}`);
      if (data) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUserBlog && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
BlogCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.string,
  isUserBlog: PropTypes.string,
};
