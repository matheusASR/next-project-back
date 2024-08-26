import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from "./Collection.entity";
import { User } from "./User.entity";

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

  @ManyToMany(() => User, (user) => user.products)
  users: User[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
