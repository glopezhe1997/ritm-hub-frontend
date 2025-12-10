export class UserDto {
  id!: number;
  name!: string;
  email!: string;
  username!: string;
  Birthdate!: Date;
  role!: string;
  isActive?: boolean;
  isBlocked?: boolean;
  createdAt!: Date;
}
