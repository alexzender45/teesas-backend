import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class LoginUserDto {
  /**
   * User's email
   */
  @IsString()
  username: string;

  /**
   * User's password
   */
  @IsString()
  password: string;
}

export class CreateUserDto {
  /**
   * User's full name
   */
  @IsString()
  username: string;
  
  @IsString()
  role: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  deposit?: number;

}
