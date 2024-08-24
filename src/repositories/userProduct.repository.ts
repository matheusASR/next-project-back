import { AppDataSource } from "../data-source";
import { UserProduct } from "../entities";

export default AppDataSource.getRepository(UserProduct);