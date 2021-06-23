import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User) //define qual que é o tipo ()
class UserRepositories extends Repository<User> { //extends para ter acesso a todos os métodos que já tem no repositório

} 


export { UserRepositories };