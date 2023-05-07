import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGetResponse, User } from '~/modules/common/decorators';
import { AuthGuard } from '~/modules/common/guards';
import { CreateUserDTO } from '../user/dtos/create-user.dto';
import { UserDTO } from '../user/dtos/user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/verify')
  @ApiOperation({ summary: 'Verify user Id token' })
  @ApiGetResponse('Successfully verified token', UserDTO as any)
  @UseGuards(AuthGuard)
  async verifyToken(@User() user: any) {
    return this.authService.getMe(user.email, user.provider);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Verify user Id token' })
  @ApiGetResponse('Successfully verified token', UserDTO as any)
  async login(@Body() payload: CreateUserDTO) {
    return this.authService.loginOrCreate(payload);
  }
}
