import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";



interface IComplimentRequest {
    tag_id: string;
    user_sender:string;
    user_receiver:string;
    message:string;
}
class CreateComplimentService {
    async execute({tag_id,user_sender,user_receiver,message}: IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UserRepositories); //para validar se o usuário é válido

        const userReceiverExists = await userRepositories.findOne(user_receiver);

        //verifica se recebedor existe
        if (!userReceiverExists){
            throw new Error("User receiver does not exists");
        }

        if(user_sender === user_receiver){ //verifica se usuário envia para ele mesmo
            throw new Error("Incorrect User Receiver");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };