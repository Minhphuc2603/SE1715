import mongoose, { Schema } from "mongoose";

// Product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name already existing']
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be > 0']
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type:String,
        required: true
    }
},{
    timestamps:true
});

// Mapping to Collection 'Products'
const Product = mongoose.model("Products", productSchema);
export default Product;