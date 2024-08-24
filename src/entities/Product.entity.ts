import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from "./Collection.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column("text")
  description: string;

  @Column("json")
  content: object;

  @Column({ length: 255 })
  coverImage: string;

  @ManyToOne(() => Collection, (collection) => collection.products)
  collection: Collection;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
