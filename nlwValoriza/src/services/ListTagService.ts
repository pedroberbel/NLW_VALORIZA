import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";
import { classToPlain } from "class-transformer";

class ListTagService {
    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepository)
        // let tags = await tagsRepositories.find(); //typeorm faz toda a busca e só depois é possível realizar a manipulação do que foi encontrado
        // tags = tags.map(tag =>( { //pega cada tag encontrada... (para sobrescrever o objeto e adicionar o nameCustom com a #)
            //  ...tag, nameCustom: `#${tag.name}`   // ...tag : recupera todas as informações de dentro do objeto de tag
        // }));
        
        // ou faz por meio da classe class-transformer (yarn add): (na entidade tag importa esta classe)
        const tags = await tagsRepositories.find();

        return classToPlain(tags); //vai dentro da entidade de tags e criar novos objetos adicionando o namecustom
        return tags;

    }

}

export { ListTagService };