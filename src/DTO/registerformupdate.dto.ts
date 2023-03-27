import { IsNotEmpty, IsInt, Length } from "class-validator";

export class StudentRegFormUpdate {   
   
   @Length(3,8)
    name: string;



}