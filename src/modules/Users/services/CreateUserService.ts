import User from "../typeorm/entities/Users";
import AppError from "@shared/errors/AppError";
import {getCustomRepository} from 'typeorm';
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUser {
  public async execute({name, email, password}: IRequest ): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if(emailExists){
        throw new AppError("Email address alread used.");
    }

    const user = usersRepository.create({
        name, email, password
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUser;