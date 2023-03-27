import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRegEntity } from "../Entity/app.Librarian.entity";
import { BookForm } from "../DTO/app.LibrarianForm.dto";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookRegEntity)
        private bookRepo: Repository<BookRegEntity>,
      ) {}


insertbook(mydto:BookForm):any {
    
   return this.bookRepo.save(mydto);
      }
      getAdminBybookID(id):any {
        return this.bookRepo.find({ 
                where: {id:id},
            relations: {
                student: true,
            },
         });
    }

}