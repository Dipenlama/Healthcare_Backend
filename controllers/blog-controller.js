const blogModel = require("../models/blog-model")

const createBlog = async (req, res) => {
  try {
    const { title, imageUrl, content, author, category } = req.body;
    console.log(req.body);

    const newBlog = await blogModel.create({ title, imageUrl, content, author, category });

    await newBlog.save();

    res
      .status(201)
      .send({
        success: true,
        message: "Blog created successfully",
        data: newBlog,
      });
  } catch (error) {
    console.log(error);
    res
      .status(201)
      .send({
        success: false,
        message: `Error in Create Blog controller ${error.message}`,
      });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({})
    res.status(200).send({ success: true, blogs });
  } catch (error) {
    console.log(error);
    res
      .status(201)
      .send({
        success: false,
        message: `Error in Get Blogs controller ${error.message}`,
      });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    res.status(200).send({ success: true, blog });
  } catch (error) {
    console.log(error);
    res
      .status(201)
      .send({
        success: false,
        message: `Error in Get Blog by ID controller ${error.message}`,
      });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const { title, imageUrl, content } = req.body;
    const { id } = req.params;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, imageUrl, content },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Update Blog controller ${error.message}`,
    });
  }
}

  const deleteBlogById = async (req, res) => { 
    try {
      const { id } = req.params;
      await blogModel.findByIdAndDelete(id);
      res.status(200).send({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `Error in Delete Blog controller ${error.message}`,
      });
    }
  };

module.exports = { createBlog, getBlogs, getBlogById, updateBlogById, deleteBlogById };
