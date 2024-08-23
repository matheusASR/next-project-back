import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category.entity";

@Entity("collections")
export class Collection {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column("text")
  description: string;

  @Column({ length: 255 })
  coverImage: string;

  @OneToOne(() => Category, (category) => category.collection)
  @JoinColumn()
  category: Category;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
