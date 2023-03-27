import { IsNotEmpty, IsInt, Length } from "class-validator";

export class StudentFormUpdate {   
   
   @Length(3,8)
    fullname: string;



}