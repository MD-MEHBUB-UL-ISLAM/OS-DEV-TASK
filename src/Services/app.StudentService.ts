import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StudentEntity } from "../Entity/app.StudentEntity.entity";
import { StudentForm } from "../DTO/app.StudentForm.dto";
import { StudentFormUpdate } from "../FormUpdate/app.studentformupdate";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepo: Repository<StudentEntity>,
        private mailerService: MailerService
      
        ) {}

getIndex():any { 
    return this.studentRepo.find();

}
getUserByID(id):any {
    return this.studentRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
    return this.studentRepo.findOneBy({ id:qry.id,fullname:qry.fullname });
}

insertUser(mydto:StudentForm):any {
    const studentaccount = new StudentEntity()
    studentaccount.fullname = mydto.fullname;
    studentaccount.email = mydto.email;
    studentaccount.password = mydto.password;
    studentaccount.info = mydto.info;
    studentaccount.CGPA=mydto.CGPA;
    studentaccount.phone=mydto.phone;
    studentaccount.isActive=mydto.isActive
   return this.studentRepo.save(studentaccount);
      }

    

updateUser(fullname,email):any {
   
    return this.studentRepo.update({email:email},{fullname:fullname});
    }
updateUserbyid(mydto:StudentFormUpdate,id):any {
    return this.studentRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.studentRepo.delete(id);
    }
    

    
    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.studentRepo.save(mydto);
        }
        
        async signin(mydto){
            console.log(mydto.password);
        const mydata= await this.studentRepo.findOneBy({email: mydto.email});
        const isMatch= await bcrypt.compare(mydto.password, mydata.password);
        if(isMatch) {
        return 1;
        }
        else {
            return 0;
        }
        
        }
        
        async sendEmail(mydata){
         return   await this.mailerService.sendMail({
                
                to: mydata.email,
                subject: mydata.subject,
                text: mydata.text, 
              });
        
        }


}