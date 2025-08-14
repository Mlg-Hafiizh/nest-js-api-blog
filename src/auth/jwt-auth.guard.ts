import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}

	handleRequest<TUser = unknown>(
		err: unknown,
		user: TUser,
		info: unknown,
		context: ExecutionContext,
		status?: number,
	): TUser {
		if (err || !user) {
			// Ambil pesan dari info kalau ada
			const message =
				info && typeof info === 'object' && 'message' in info
					? (info as { message: string }).message
					: 'Belum login';

			// Bisa log context untuk debugging
			const req = context.switchToHttp().getRequest();
			console.log(`Unauthorized access to: ${req.url}`);

			// Kalau ada status custom dari Passport, pakai
			throw new UnauthorizedException({
				statusCode: status || 401,
				message,
			});
		}

		return user;
	}
}
