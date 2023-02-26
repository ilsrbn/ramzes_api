import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1677410275057 implements MigrationInterface {
    name = 'INIT1677410275057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`file_url\` varchar(255) NOT NULL, \`file\` varchar(255) NOT NULL, \`postId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(120) NOT NULL DEFAULT '', \`description\` text NULL, \`event_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`posted\` tinyint NOT NULL DEFAULT 0, FULLTEXT INDEX \`IDX_e28aa0c4114146bfb1567bfa9a\` (\`title\`), FULLTEXT INDEX \`IDX_1d7dd290fbb1d4d64c7aee178f\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(30) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(120) NOT NULL DEFAULT '', \`description\` text NULL, \`ownerId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`posted\` tinyint NOT NULL DEFAULT 0, FULLTEXT INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` (\`title\`), FULLTEXT INDEX \`IDX_7b7115fda47b20b277b8ca6f89\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_09f5bc45017ed4f20ad606985a0\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_4490d00e1925ca046a1f52ddf04\` FOREIGN KEY (\`ownerId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_ffcf79002e1738147305ea57664\` FOREIGN KEY (\`ownerId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_ffcf79002e1738147305ea57664\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_4490d00e1925ca046a1f52ddf04\``);
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_09f5bc45017ed4f20ad606985a0\``);
        await queryRunner.query(`DROP INDEX \`IDX_7b7115fda47b20b277b8ca6f89\` ON \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d7dd290fbb1d4d64c7aee178f\` ON \`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_e28aa0c4114146bfb1567bfa9a\` ON \`post\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
