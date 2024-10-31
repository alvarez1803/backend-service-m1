import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

// traemos la tabla o entidad producto de la base de datos
const ProductRepository = AppDataSource.getRepository(Product);

// obtener todos los productos
export const getAllProduct = async(req: Request, res: Response) => {
    try {
        const Products = await ProductRepository.find();
        res.json(Products);
    } catch(error) {
        res.status(500).json({
        message: "error al obtener los productos."
    });
}
};

// obtener un producto
export const getProductByID = async(req: Request, res: Response) => {
    try {
        const Product = await ProductRepository.findOneBy({
            id: parseInt(req.params.id)
        });
        if (Product) {
            res.json(Product);
        } else {
            res.status(404).json({
                message: "producto no encontrado."
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "error al obtener el producto."
        });
    }
};

// crear un producto
export const createProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {
        
    }
};

// actualizar un producto existente
export const updateProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {
        
    }
};

// eliminar un producto existente
export const deleteProduct = async(req: Request, res: Response) => {
    try {

    } catch(error) {
        
    }
};