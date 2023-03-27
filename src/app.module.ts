import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { StudentModule } from './Module/app.StudentModule';
import { StudentRegModule } from './Module/registermodule.module';
import { CourseModule } from './Module/course.module';
import { BookModule } from './Module/app.LibrarianModule';
import { NoteModule } from './Module/app.NotesModule';



@Module({
  imports: [StudentModule,StudentRegModule, CourseModule,BookModule,NoteModule, TypeOrmModule.forRoot(
   { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'ums',
    autoLoadEntities: true,
    synchronize: true,
  }
  ),],
  controllers: [],
  providers: [],
})
export class AppModule {}