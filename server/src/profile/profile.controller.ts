import { Controller, Get, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async findUser(@Request() req) {
    return await this.profileService.findUser(
      req.headers.authorization.split(' ')[1],
    );
  }
}
