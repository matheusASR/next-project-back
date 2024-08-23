import { Request, Response } from "express";
import { collectionServices } from "../services";
import { ICollectionReturn, CollectionRead, CollectionReturn } from "../interfaces";
import { DeepPartial } from "typeorm";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const collection: any = await collectionServices.create(payload);
  return res.status(201).json(collection);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const collections: any = await collectionServices.read();
  return res.status(200).json(collections);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const collection: any = await collectionServices.retrieve(id);
  return res.status(200).json(collection);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload: DeepPartial<ICollectionReturn> = req.body;
  const foundCollection: any = res.locals.foundCollection;
  const collectionUpdated = await collectionServices.update(foundCollection, payload);

  return res.status(200).json(collectionUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await collectionServices.destroy(res.locals.foundCollection);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };