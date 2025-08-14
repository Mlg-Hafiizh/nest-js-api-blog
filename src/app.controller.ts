import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	@UseGuards(JwtAuthGuard)
	getProfile(@Request() req) {
		return { user: req.user };
	}
}
