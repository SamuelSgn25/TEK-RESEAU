import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  mark(@Body() { activityId, memberId, status }: { activityId: number; memberId: number; status: string }) {
    return this.attendanceService.markAttendance(activityId, memberId, status);
  }

  @Get('activity/:id')
  getForActivity(@Param('id') id: string) {
    return this.attendanceService.getForActivity(+id);
  }

  @Delete('activity/:activityId/member/:memberId')
  remove(@Param('activityId') activityId: string, @Param('memberId') memberId: string) {
    return this.attendanceService.removeMemberFromActivity(+activityId, +memberId);
  }
}
