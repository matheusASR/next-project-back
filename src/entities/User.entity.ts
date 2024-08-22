import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 120 })
  password: string;

  @Column({ default: false })
  admin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashSensitiveData() {
    const passwordRounds = 10;

    const hasPasswordRounds = getRounds(this.password);

    if (!hasPasswordRounds) {
      this.password = hashSync(this.password, passwordRounds);
    }
  }
}
