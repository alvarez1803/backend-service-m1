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
      const{ name, description, price } = req.body;
      const product = new Product();
      product.name = name;
      product.description = description;
      product.price = price;
      await ProductRepository.save(product);
      res.status(201).json(product);
    } catch(error) {
        res.status(500).json({
            message: "error al crear el producto."
        });
    }
};

// actualizar un producto existente
export const updateProduct = async(req: Request, res: Response) => {
    try {
      const { name, description, price } = req.body; //tomamos los datos del request

      //buscamos el producto para actualizar
      const product = await ProductRepository.findOneBy({
         id: parseInt(req.params.id)
      });

      //validamos que el producto si exista
      if (product) {
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        await ProductRepository.save(product); //guardamos los cambios del producto
        res.json(product);
      } else {
        res.status(404).json({
            message: "No se encontro el producto."
        });
      }
    } catch(error) {
        res.status(500).json({
            message: "error al actualizar el producto."
        });
    }
};

// eliminar un producto existente
export const deleteProduct = async(req: Request, res: Response) => {
    try {
       //buscamos el producto para eliminarlo
      const product = await ProductRepository.findOneBy({
        id: parseInt(req.params.id)
     });

     //validamos que el producto si exista
     if (product) {
       await ProductRepository.remove(product); //borramos el producto
       res.json({
        message: "producto eliminado"
       });
     } else {
       res.status(404).json({
           message: "No se encontro el producto."
       });
     }
    } catch(error) {
        res.status(500).json({
            message: "error al eliminar el producto."
        });
    }
};