import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        }, 
        subTitle: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;