import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";

@Entity("user_products")
export class UserProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.userList)
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  addedAt: Date;
}
