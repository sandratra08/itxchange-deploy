import { User } from '../entities/user.entity';
import { FileEntity } from './../../files/entities/file.entity';
export class DbUserDto {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photo?: FileEntity | null;

  static dtoFromUser(user: User) {
    const db = new DbUserDto();
    db.email = user.email;
    db.firstName = user.firstName;
    db.lastName = user.lastName;
    db.photo = user.photo;
    return db;
  }

  static arrayDtoFromUsers(users: User[]) {
    return users.map((user) => this.dtoFromUser(user));
  }
}
