import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentRegEntity } from "../Entity/registerentity.entity";
import { StudentRegForm } from "../DTO/registerform.dto";
import { StudentRegFormUpdate } from "../DTO/registerformupdate.dto";


@Injectable()
export class StudentRegService {
    constructor(
        @InjectRepository(StudentRegEntity)
        private studentregRepo: Repository<StudentRegEntity>,
 
      
      
        ) {}

getIndex():any { 
    return this.studentregRepo.find();

}
getUserByID(id):any {
    return this.studentregRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
    return this.studentregRepo.findOneBy({ id:qry.id,name:qry.name });
}

insertUser(mydto:StudentRegForm):any {
    const adminaccount = new StudentRegEntity()
    adminaccount.name = mydto.name;
    adminaccount.email = mydto.email;

    adminaccount.address = mydto.address;
   return this.studentregRepo.save(adminaccount);
      }

updateUser(name,email):any {
   
    return this.studentregRepo.update({email:email},{name:name});
    }
updateUserbyid(mydto:StudentRegFormUpdate,id):any {
    return this.studentregRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.studentregRepo.delete(id);
    }
    
    getManagersByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
                courses: true,
            },
         });
    }

    getbooksByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
              
                books:true,
            },
         });
    }
    
    getnotesByAdminID(id):any {
        return this.studentregRepo.find({ 
                where: {id:id},
            relations: {
              
                notes:true,
            },
         });
    }





}