import { AppDataSource } from "../data-source";
import { Collection } from "../entities";

export default AppDataSource.getRepository(Collection);