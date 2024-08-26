import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";

@Entity("user_products")
export class UserProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Product, (product) => product.users)
  product: Product;
}
