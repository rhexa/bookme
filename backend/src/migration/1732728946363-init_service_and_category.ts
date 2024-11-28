import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class InitServiceAndCategory1732728946363 implements MigrationInterface {
  name = 'InitServiceAndCategory1732728946363'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 8,
            scale: 2,
            isNullable: false,
          },
        ],
      })
    )

    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
    )

    await queryRunner.addColumn(
      'service',
      new TableColumn({
        name: 'categoryId',
        type: 'int',
        isNullable: true,
      })
    )

    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'serviceId',
        type: 'int',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'service',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service')
    await queryRunner.dropTable('category')
  }
}
