export enum UserRoles {
  user = "user",
  redactor = "redactor",
  admin = "admin",
}

export type TUser = {
  userID: number;
  email: string;
  password: string;
  fullName: string;
  role: UserRoles;
  department: string;
  phone: string;
};
