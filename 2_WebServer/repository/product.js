import Product from "../models/product.js";

// C: Create a new product
const createProduct = async ({
    name,
    price,
    description,
    category
}) => {
    try {
        // Fetch a product by name
        const existingProduct = await Product.findOne({ name }).exec();
        // Check existing product
        if (existingProduct) {
            return { error: 'This product already exists', status: 404 };
        }


        // Create product
        const newProduct = await Product.create({ name, price, description, category });
        // Return newProduct created
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}
// R: Retrieve all products
const getAllProducts = async () => {
    try {
        const allProducts = await Product.find().exec();
        return allProducts;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const getProductById = async (ProductID) => {
    try {
        const product = await Product.findById(ProductID).exec();

        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    createProduct,getAllProducts,getProductById
}