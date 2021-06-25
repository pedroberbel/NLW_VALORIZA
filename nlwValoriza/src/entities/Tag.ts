import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Expose } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity("tags")
class Tag {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: "name_Custom"}) //quando for expor esta entidade, ele cria este campo personalizado
    nameCustom():string{
        return `#${this.name}`;
    }

    constructor(){
        //se id vier vazio, significa que será preciso criá-lo
        if(!this.id){
            this.id = uuid();
        }
    }
}


export { Tag };