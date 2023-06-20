import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import moment from "moment";
let BlogCountToShow = 0;

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`https://fullstackblogapp-svnd.onrender.com/api/blogs/userblog/${id}`);
      if (data) {
        setBlogs(data.blogs);
        BlogCountToShow = data.BlogCount;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      <h3>Blog count: {BlogCountToShow}</h3>
      {blogs && blogs.length > 0 ? 
      (
        blogs.map((blog) => (
          <BlogCard key={blog.userId.id}
          id={blog._id}
          isUserBlog={true}
          title={blog.title} 
          description={blog.body}
          image={blog.image}
          username={blog.userId.username}
          time= {moment(blog.createdAt).format("MMM Do YY, h:mm a")}
          />
        )
        )) : (
          <h1 style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:40}}>Please create a blog first</h1>
        )}
    </div>
  );
};

export default UserBlog;
