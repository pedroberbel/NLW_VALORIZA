import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagSevice";


class CreateTagController {


    async handle(request: Request, response: Response){
        const { name } = request.body; 
        // esta desestruturação acima do request.body evita o código abaixo:
        // const data = request.body;
        // data.name <- acessar o valor do name 
        //************************************ 
        //chama o service
        const createTagService = new CreateTagService();

        const tag = await createTagService.execute(name);

        return response.json(tag);
    }
}

export { CreateTagController };