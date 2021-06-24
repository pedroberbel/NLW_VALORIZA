import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}
class AuthenticateUserService {

    async execute ({email,password}:IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UserRepositories);
        
        //verificar se email existe
        const user = await userRepositories.findOne({
            email
        });

        //quando apssamos um erro de retorno, se é colocado "email incorrect", se houver alguma pessoa querendo hackear o acesso
        //se coloca email ou senha incorreto, deixa uma dúvida do que realmente existe no banco de dados
        if(!user) {
            throw new Error("Email or password incorrect");
        }
        //verificar se senha está correta (outro método do bcryptjs) - pega a senha inserida, pega a senha hash e compara se correspondem
        //retorna um boolean
        const passwordMatch = await compare(password, user.password)
    
        if(!passwordMatch){
            throw new Error("Email or password incorrect");
        }
        //gerar o token - se tudo estiver correto
        //sign(payload, md5, )
        const token = sign({
            email:user.email
        },
            "d97f56059d846da13126cd2eabe3657b", //https://www.md5hashgenerator.com/     --- // https://jwt.io/
        {
            subject:user.id,
            expiresIn: "1d" //1 dia
        }
        );
        return token;
    }

}

export { AuthenticateUserService };