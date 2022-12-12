import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [UserModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
