export class CreateUserDto {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly phone_number: string;
  readonly last_name: string;
  readonly first_name: string;
  readonly nick_name: string;
}
