import { Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken" //verifica se o token é valido

interface IPayload {
    sub:string;
}

export function ensureAutenticated(request: Request, response: Response, next: NextFunction){
    //***receber token
    const authToken = request.headers.authorization //vem com bearer
    
    //***validar se preenchido
    if(!authToken){
        return response.status(401).end(); //.end pega a mensagem padrão do código 401.
    }

    const [, token] = authToken.split(" "); // remove o "Bearer" do token recebido -> retorna um array com a quantidade de posições divididas pelo valor dentro de (" "), neste caso usamos o espaço
                                            //[, token ] =>>retorna para o array: ["Baerer", token...]

    //***validar se válido
    try {
       const {sub} = verify(token, "d97f56059d846da13126cd2eabe3657b") as IPayload; // desestruturando o decode: { sub } - sub é o ID do usuário // Força verify receber o tipo IPayload, pois é sabido que sub é uma string

       request.user_id = sub; //user_id não existe dentro do request, por isso ele não a reconhece - utiliza-se a sobrescrita de tipagem (do TS) / cria interface para receber, já que o sub é uma função
       return next(); //para que siga o fluxo sem problemas - o usuário está autenticado
    } catch(err){
        return response.status(401).end();
    }

    //***recuperar info do usuário 

    
}