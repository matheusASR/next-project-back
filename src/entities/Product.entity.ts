import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./Category.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column("json")
  content: object;

  @Column({ length: 255 })
  coverImage: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
