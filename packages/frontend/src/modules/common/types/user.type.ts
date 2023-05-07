export type UserDTO = {
  id: string;
  email: string;
  provider: string;
  name: string;
  avatar: string;
};

export type CreateUserDTO = {
  email: string;
  loginProvider: string;
  name: string;
  avatar: string;
};
