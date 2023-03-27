
import { IsInt, IsNotEmpty ,IsEmail,Matches,IsBoolean, IsString} from "class-validator";
import { Transform } from "class-transformer";
export class StudentForm {   
   
   

    @IsNotEmpty({message: "Please give student's information"})
   @Transform(({ value }) => value.split(','))
    //@IsString()
    fullname:string;
    
    @IsNotEmpty({message: "Please give student's CGPA"})
   @IsString()
    CGPA:string;

    @IsNotEmpty({message: "Please give student's email"})
    @IsEmail()
    email: string;


    @IsNotEmpty({message: "Please give student's information"})
  @Matches(/^(?:(?:\+|00)88|01)?\d{11}$/gm, {message:"please enter valid phone number"})
  phone: string;



  @IsNotEmpty({message: "Please give student's validate or active or inactive or nonvalidate"})
@IsBoolean()
@Transform(({ value }) => value === '1' || value === 'true')
isActive: boolean;

@IsNotEmpty({message: "Please give student's information"})
@IsString()
info:string;

@IsNotEmpty({message: "Please give student's password"})
@IsString()
password:string;

@IsNotEmpty({message: "Please give student's photo"})
@IsString()
filename: string;
 


}