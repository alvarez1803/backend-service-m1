import { Router} from "express";
import {
    getAllProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
 } from "..//controllers/productController" ;

 const productRoutes = Router();

 /**
  * @swagger
  * /api/products:
  *  get:
  *  summary: obtener todos los productos
  *  responses:
  *    200:
  *       description: Lista de productos
  */
 productRoutes.get("products/" , getAllProduct);
 productRoutes.get("products/:id" , getProductByID);
 productRoutes.post("products/", createProduct);
 productRoutes.put("products/:id", updateProduct);
 productRoutes.delete("products/:id", deleteProduct);

 export default productRoutes;