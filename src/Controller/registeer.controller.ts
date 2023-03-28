import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards
} from '@nestjs/common';

import { CourseForm } from 'src/DTO/course.dto';
import { CourseService } from 'src/Services/course.service';
import { StudentRegForm } from '../DTO/registerform.dto';
import { StudentRegFormUpdate } from '../FormUpdate/registerformupdate.dto';
import { StudentRegService } from '../Services/registerservice.service';
import { BookService } from 'src/Services/app.LibrarianService';
import { BookForm } from 'src/DTO/app.LibrarianForm.dto';
import { NoteService } from 'src/Services/app.NotesService';
import { NoteForm } from 'src/DTO/app.NotesForm.dto';


@Controller('/reg')
export class StudentRegController {
  constructor(private studentService: StudentRegService,
    private courseService: CourseService,
    private bookService: BookService,
    private noteService:NoteService
    ) {}

  @Get('/index')
  getAdmin(): any {
    return this.studentService.getIndex();
  }
  
  @Get('/findadmin/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.getUserByID(id);
  }

  @Get('/findadmin')
  getAdminByIDName(@Query() qry: any): any {
    return this.studentService.getUserByIDName(qry);
  }
  @Post('/insertadmin')
@UsePipes(new ValidationPipe())
  insertAdmin(@Body() mydto: StudentRegForm): any {
    return this.studentService.insertUser(mydto);
  }

  @Put('/updateadmin/')

  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    console.log(session.email);
    return this.studentService.updateUser(name, session.email);
  }

  @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: StudentRegFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.studentService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.deleteUserbyid(id);
   
  }

  @Post('/insertcourse')
  @UsePipes(new ValidationPipe())
    insertManager(@Body() coursedto: CourseForm): any {
      return this.courseService.insertManager(coursedto);
    }

    @Post('/insertbook')
  @UsePipes(new ValidationPipe())
    insertbook(@Body() bookdto: BookForm): any {
      return this.bookService.insertbook(bookdto);
    }
    @Post('/insertnote')
  @UsePipes(new ValidationPipe())
    insertnote(@Body() notedto: NoteForm): any {
      return this.noteService.insertnote(notedto);
    }
    @Get('/findcoursesbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.studentService.getManagersByAdminID(id);
    }

    @Get('/findadminbycourse/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.courseService.getAdminByManagerID(id);
    }


    @Get('/findbooksbyadmin/:id')
    getbookByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.studentService.getbooksByAdminID(id);
    }

    @Get('/findadminbybook/:id')
    getAdminBybookID(@Param('id', ParseIntPipe) id: number): any {
      return this.bookService.getAdminBybookID(id);
    }

    @Get('/findnotesbyadmin/:id')
    getnoteByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.studentService.getnotesByAdminID(id);
    }

    @Get('/findadminbynote/:id')
    getAdminBynoteID(@Param('id', ParseIntPipe) id: number): any {
      return this.noteService.getAdminBynoteID(id);
    }
   
  }