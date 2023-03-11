import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteAndRemovePostedFromPhoto1678534019184 implements MigrationInterface {
    name = 'OnDeleteAndRemovePostedFromPhoto1678534019184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_da62a9b372a65aef16fc6804d47\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`content\` \`content\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`coverId\` \`coverId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_da62a9b372a65aef16fc6804d47\` FOREIGN KEY (\`coverId\`) REFERENCES \`photo\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_da62a9b372a65aef16fc6804d47\``);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`coverId\` \`coverId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`content\` \`content\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_da62a9b372a65aef16fc6804d47\` FOREIGN KEY (\`coverId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
