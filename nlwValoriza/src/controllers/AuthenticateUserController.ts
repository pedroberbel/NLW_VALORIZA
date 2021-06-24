import { Request, Response} from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUsercontroller {

    async handle(request: Request, response: Response){
        const {email, password} = request.body
        
        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            email,
            password
        });
        console.log(token);
        return response.json(token);
    }
}

export { AuthenticateUsercontroller }