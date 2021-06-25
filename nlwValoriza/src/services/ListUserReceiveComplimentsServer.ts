import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";



class ListUserReceiveComplimentsServer {

    async execute(user_id:string){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id,
            },
            relations: ["userSender", "userReceiver", "tag"], //para trazer o objeto completo com todas as informações relacionadas ao elogio
        });
        return compliments;
    }
}


export { ListUserReceiveComplimentsServer };