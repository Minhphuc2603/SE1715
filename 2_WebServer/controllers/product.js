import { productDAO } from "../repository/index.js";

const getAllProducts = async (req, res) => {
    try{
        const result = await productDAO.getAllProducts()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({
            message_err: error.toString()
        });
    }
}

const createProduct = async(req, res) => {
    try {
        const {name, price, description, category} = req.body;
        const result = await productDAO.createProduct({name, price, description, category});
        if (result.error) {
            res.status(result.status).json({ error: result.error });
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}
const getProductById = async (req,res)=>{
    try {
        const ProductID = req.params.id;
        const result = await productDAO.getProductById(ProductID)
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}
export default{
    getAllProducts,
    createProduct,
    getProductById
}