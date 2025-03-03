const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Dr. Asad Raza" },
  category: {
    type: String,
    enum: ["Public Education", "Medical Education"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
