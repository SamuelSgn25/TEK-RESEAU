import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { ActivitiesModule } from './activities/activities.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [PrismaModule, AuthModule, MembersModule, ActivitiesModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
