import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1724715524379 implements MigrationInterface {
    name = 'InitialMigration1724715524379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "coverImage" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "content" json NOT NULL, "coverImage" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "collectionId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "username" character varying(100) NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_products" ("id" SERIAL NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_347cc741febfe07d6d46d048fb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_products_products" ("usersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_2afd1e49d5e0313b15aee86424f" PRIMARY KEY ("usersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aca61847cb6726b22e1fd4020b" ON "users_products_products" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f3f6ee991534b7dfa039912c3f" ON "users_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_53823b875c14daa5e9009ee6839" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_products" ADD CONSTRAINT "FK_41f6a2a2b164dc884c7d2624372" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_products" ADD CONSTRAINT "FK_571654966d6b6b3eb34b5a03b63" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_products_products" ADD CONSTRAINT "FK_aca61847cb6726b22e1fd4020bc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_products_products" ADD CONSTRAINT "FK_f3f6ee991534b7dfa039912c3fd" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_products_products" DROP CONSTRAINT "FK_f3f6ee991534b7dfa039912c3fd"`);
        await queryRunner.query(`ALTER TABLE "users_products_products" DROP CONSTRAINT "FK_aca61847cb6726b22e1fd4020bc"`);
        await queryRunner.query(`ALTER TABLE "user_products" DROP CONSTRAINT "FK_571654966d6b6b3eb34b5a03b63"`);
        await queryRunner.query(`ALTER TABLE "user_products" DROP CONSTRAINT "FK_41f6a2a2b164dc884c7d2624372"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_53823b875c14daa5e9009ee6839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3f6ee991534b7dfa039912c3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aca61847cb6726b22e1fd4020b"`);
        await queryRunner.query(`DROP TABLE "users_products_products"`);
        await queryRunner.query(`DROP TABLE "user_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "collections"`);
    }

}
