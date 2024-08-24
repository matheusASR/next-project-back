import { Request, Response } from "express";
import { userServices } from "../services";
import { IUserReturn, UserRead, UserReturn } from "../interfaces";
import { DeepPartial } from "typeorm";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;
  const user: UserReturn = await userServices.create(payload);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const user: any = await userServices.retrieve(id);
  return res.status(200).json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const payload: DeepPartial<IUserReturn> = req.body;
  const foundUser: IUserReturn = res.locals.foundUser;
  const userUpdated = await userServices.update(foundUser, payload);

  return res.status(200).json(userUpdated);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(res.locals.foundUser);
  return res.status(204).json();
};

const addToList = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);

  if (isNaN(userId) || isNaN(productId)) {
    return res.status(400).json({ error: "Invalid userId or productId" });
  }

  try {
    await userServices.addToList(userId, productId);
    return res.status(200).json({ message: "Product added to list." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


const removeFromList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const productId: number = Number(req.params.productId);
  await userServices.removeFromList(userId, productId);
  return res.status(200).json();
};

export default {
  create,
  read,
  retrieve,
  update,
  destroy,
  addToList,
  removeFromList,
};
