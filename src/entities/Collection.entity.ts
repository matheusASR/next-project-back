import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity("collections")
export class Collection {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  coverImage: string;

  @OneToMany(() => Product, (product) => product.collection, { cascade: true })
  products: Product[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
