// a única informação a ser recebida será o nome

import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

class CreateTagService {

    async execute(name: string){
        const tagRepositories = getCustomRepository(TagsRepository);

        if(!name){
            throw new Error("Incorrect name");
        }

        //não pode cadastrar uma tag com nome que já existe
        //SELECT * FROM TAGS WHERE NAME = 'name' (é basicamente isso que a linha abaixo está fazendo)
        const tagAlreadyExists = await tagRepositories.findOne({
            name
        });

        if(tagAlreadyExists){
            throw new Error("Tag Already Exists!");
        }

        const tag = tagRepositories.create({
            name
        });
        
        await tagRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService }; 