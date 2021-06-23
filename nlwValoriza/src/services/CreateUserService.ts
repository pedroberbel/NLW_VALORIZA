import { UserRepositories } from "../repositories/UserRepositories";
import { getCustomRepository } from "typeorm"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name,email,admin} : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories); //precisa falar que queremos utilizar um repositório customizado


        if (!email){ //verifica se há entrada de email
            throw new Error ("Email incorrect");
        }

        //verifica se o email de entrada já está cadastrado
        const userAlreadyExists = await usersRepository.findOne({
            email
        });
        if(userAlreadyExists){
            throw new Error ("User already exists"); //lança excessão para a camada que está chamando esta classe
        }
        //se não existir, deve salvar no banco de dados
        //1 - criar uma instancia do objeto:
        const user = usersRepository.create({
            name,
            email,
            admin
        });

        //salva o objeto no banco de dados 
        await usersRepository.save(user);

        return user;

    }
}

export { CreateUserService };