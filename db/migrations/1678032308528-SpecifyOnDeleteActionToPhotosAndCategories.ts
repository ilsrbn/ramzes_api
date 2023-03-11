import { MigrationInterface, QueryRunner } from "typeorm";

export class SpecifyOnDeleteActionToPhotosAndCategories1678032308528 implements MigrationInterface {
    name = 'SpecifyOnDeleteActionToPhotosAndCategories1678032308528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`content\` \`content\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_da62a9b372a65aef16fc6804d47\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`coverId\` \`coverId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_da62a9b372a65aef16fc6804d47\` FOREIGN KEY (\`coverId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_photos_photo\` ADD CONSTRAINT \`FK_b97f3ebb141e1a778b3b8b7d321\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_photos_photo\` ADD CONSTRAINT \`FK_1e56ba761f143efadbacd9c3d6b\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_photos_photo\` DROP FOREIGN KEY \`FK_1e56ba761f143efadbacd9c3d6b\``);
        await queryRunner.query(`ALTER TABLE \`category_photos_photo\` DROP FOREIGN KEY \`FK_b97f3ebb141e1a778b3b8b7d321\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_da62a9b372a65aef16fc6804d47\``);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`coverId\` \`coverId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_da62a9b372a65aef16fc6804d47\` FOREIGN KEY (\`coverId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`content\` \`content\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
    }

}
