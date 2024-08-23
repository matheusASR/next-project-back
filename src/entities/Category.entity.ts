import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Collection } from "./Collection.entity";
import { Product } from "./Product.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column("text")
  description: string;

  @OneToOne(() => Collection, (collection) => collection.category)
  @JoinColumn()
  collection: Collection;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
