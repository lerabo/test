import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  provider: string;

  @IsString()
  name: string;

  @IsString()
  avatar: string;

  static cast(data: any) {
    const user = new UserDTO();
    user.id = data._id;
    user.email = data.email;
    user.provider = data.loginProvider;
    user.name = data.name;
    user.avatar = data.avatar;

    return user;
  }
}
