import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const accessUser = this.usersRepository.findById(user_id);

    if(!accessUser) throw new Error("User does not exists!");

    if (!accessUser.admin) throw new Error("User have no permission to list all users!");

    const userList = this.usersRepository.list();

    return userList;
  }
}

export { ListAllUsersUseCase };
