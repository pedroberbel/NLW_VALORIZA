import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1624574660006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                        
                    },
                    {
                        name: "user_sender",   //é uma foreign key, precisa referenciar de onde está vindo, qual tabela, sua primary key, 
                        type: "uuid",
                        
                    },
                    {
                        name: "user_receiver",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [ //primeira forma de criar foreign key
                    {
                        name:"FKUserSenderCompliments", 
                        referencedTableName:"users", 
                        referencedColumnNames:["id"],
                        columnNames:["user_sender"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    },
                    {
                        name:"FKUserReceiverCompliments", 
                        referencedTableName:"users", 
                        referencedColumnNames:["id"],
                        columnNames:["user_receiver"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    },
                    {
                        name:"FKTagCompliments", 
                        referencedTableName:"tags", 
                        referencedColumnNames:["id"],
                        columnNames:["tag_id"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
                    }
                ] 
            })
        )
        /*segunda forma de criar uma ForeignKey: (esta precisa ser criada também no down, a anterior, por já estar no outro UP, já seria executada automanticamente.)
        await queryRunner.createForeignKey(
            "compliments",
            new TableForeignKey({
                name:"FKUserSenderCompliments", 
                        referencedTableName:"users", 
                        referencedColumnNames:["id"],
                        columnNames:["user_sender"],
                        onDelete:"SET NULL",
                        onUpdate:"SET NULL"
            })
        )
        */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}
