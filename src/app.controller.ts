import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule as ScheduleModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly scheduleService: ScheduleService,
  ) {}

  @Get('schedule/:id')
  async getScheduleById(@Param('id') id: string): Promise<ScheduleModel> {
    return this.scheduleService.schedule({ id: id });
  }

  @Get('schedule')
  async getSchedules(): Promise<ScheduleModel[]> {
    return this.scheduleService.schedules({});
  }

  @Post('schedule')
  async createSchedule(
    @Body() postData: { name: string; email: string; date_schedule: string, hour_schedule: string },
  ): Promise<ScheduleModel> {
    const { name, email, date_schedule, hour_schedule } = postData;
    return this.scheduleService.newSchedule({
      name,
      email,
      date_schedule,
      hour_schedule
    });
  }

  @Put('schedule/:id')
  async putSchedule(
    @Param('id') id: string,
    @Body() postData: { name?: string; email?: string; date_schedule?: string; hour_schedule: string; },
  ): Promise<ScheduleModel> {
    const data = postData
    return this.scheduleService.updateSchedule({
      data,
      where: { id: id },
    });
  }

  @Delete('post/:id')
  async deleteSchedule(@Param('id') id: string): Promise<ScheduleModel> {
    return this.scheduleService.eraseSchedule({ id: id });
  }
}