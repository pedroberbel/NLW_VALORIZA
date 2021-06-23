import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {

async handle(request: Request, response: Response){ //é necessária a tipagem por estar chamando uma outra classe sem acesso à variável "app"
    const { email, name, admin } = request.body;

    //chama o user
    const createUserService = new CreateUserService(); 
    //envia a informação recebida para o service
    const user = await createUserService.execute({name,email,admin});
    //retorna a informação que foi recuperada
    return response.json(user);
}

}


export { CreateUserController };