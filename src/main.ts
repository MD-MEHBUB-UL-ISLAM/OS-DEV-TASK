import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { BookModule } from './Module/app.LibrarianModule';
import { NoteModule } from './Module/app.NotesModule';
import { StudentModule } from './Module/app.StudentModule';
import { CourseModule } from './Module/course.module';
import { StudentRegModule } from './Module/registermodule.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 30000
      }
    }),
  );
  
  
const app1 = await NestFactory.create(AppModule, { cors: true });
await app1.listen(3000);
const app2 = await NestFactory.create(BookModule, { cors: true });
await app2.listen(3000);
const app3 = await NestFactory.create(NoteModule, { cors: true });
await app3.listen(3000);
const app4 = await NestFactory.create(CourseModule, { cors: true });
await app4.listen(3000);
const app5 = await NestFactory.create(StudentModule, { cors: true });
await app5.listen(3000);
const app6 = await NestFactory.create(StudentRegModule, { cors: true });
await app6.listen(3000);

  await app.listen(3000);
}
bootstrap();
