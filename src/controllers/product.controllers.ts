import { Request, Response } from "express";
import { productServices } from "../services";
import { IProductReturn, ProductRead, ProductReturn } from "../interfaces";
import { DeepPartial } from "typeorm";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const product: any = await productServices.create(payload);
  return res.status(201).json(product);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const products: any = await productServices.read();
  return res.status(200).json(products);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const product: any = await productServices.retrieve(id);
  return res.status(200).json(product);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload: DeepPartial<IProductReturn> = req.body;
  const foundProduct: any = res.locals.foundProduct;
  const productUpdated = await productServices.update(foundProduct, payload);

  return res.status(200).json(productUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await productServices.destroy(res.locals.foundProduct);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };
