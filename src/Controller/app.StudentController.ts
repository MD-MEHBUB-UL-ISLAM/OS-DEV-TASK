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
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';



import { StudentService } from '../Services/app.StudentService';
import { StudentFormUpdate } from '../FormUpdate/app.studentformupdate';
import { SessionGuard } from '../SessionGuard/app.student.sessionguard';
import { StudentForm } from '../DTO/app.StudentForm.dto';


@Controller('/student')
export class StudentController {
  constructor(private studentService: StudentService,
   
    ) {}

  @Get('/index')
  getAdmin(): any {
    return this.studentService.getIndex();
  }
  
  @Get('/findstudent/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.getUserByID(id);
  }

  @Get('/findstudent')
  getAdminByIDName(@Query() qry: any): any {
    return this.studentService.getUserByIDName(qry);
  }
  @Post('/insertstudent')
  @UsePipes(new ValidationPipe({transform:true}))
  insertAdmin(@Body() mydto: StudentForm): any {
    return this.studentService.insertUser(mydto);
  }

  @Put('/updatestudent')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe({transform:true}))
  updateAdmin(@Session() session,@Body('fullname') fullname: string): any {
    console.log(session.email);
    return this.studentService.updateUser(fullname, session.email);
  }

  @Put('/updatestudent/:id')
  @UsePipes(new ValidationPipe({transform:true}))
  updateAdminbyid(
    @Body() mydto: StudentFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.studentService.updateUserbyid(mydto, id);
  }

  @Delete('/deletestudent/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.studentService.deleteUserbyid(id);
   
  }


   
   

   
   
@Post('/signup')
@UsePipes(new ValidationPipe({transform:true}))
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:StudentForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1600000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.studentService.signup(mydto);
console.log(file)
}
@Get('/signin')
signin(@Session() session, @Body() mydto:StudentForm)
{
if(this.studentService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
 
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
@Post('/sendemail')
sendEmail(@Body() mydata){
return this.studentService.sendEmail(mydata);
}





}
