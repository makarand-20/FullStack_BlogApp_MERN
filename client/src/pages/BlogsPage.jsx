import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import moment from "moment";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/blogs/getall");
      if (data) {
        setBlogs(data.blogs); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard key={blog._id}
          id={blog._id}
          isUserBlog={localStorage.getItem("userId") === blog.userId._id}
          title={blog.title} 
          description={blog.body}
          image={blog.image}
          username={blog.userId.username}
          time= {moment(blog.createdAt).format("MMM Do YY, h:mm a")}
          />
        ))}
    </div>
  );
}

export default BlogsPage