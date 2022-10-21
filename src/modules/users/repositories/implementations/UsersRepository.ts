import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";
import {v4 as uuidV4} from 'uuid'

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user: User = {
      id: uuidV4(),
      name,
      admin: false,
      email,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser;
    
    user.admin = true;
    user.updated_at = new Date();

    this.users = this.users.filter(user => user.id != receivedUser.id)
    this.users.push(user);

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
