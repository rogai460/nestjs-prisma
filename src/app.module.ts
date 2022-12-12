import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProjectsService } from './projects/projects.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, ProjectsService],
})
export class AppModule {}
