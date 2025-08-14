import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
	sub: string;
	email: string;
	// add other properties if needed
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET environment variable is not set');
		}
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: JwtPayload) {
		return { userId: payload.sub, email: payload.email };
	}
}
