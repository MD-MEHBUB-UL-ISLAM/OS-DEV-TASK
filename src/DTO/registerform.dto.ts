import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class StudentRegForm {   
   

   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;


 
    address: string;



}