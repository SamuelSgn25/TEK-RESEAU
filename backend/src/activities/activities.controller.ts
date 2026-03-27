import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() data: any) {
    return this.activitiesService.create(data);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.activitiesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
