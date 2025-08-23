import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const jwtAuthGuard = app.get(JwtAuthGuard); // Ambil dari container Nest

	app.useGlobalFilters(new AllExceptionsFilter());

	app.useGlobalGuards(jwtAuthGuard); // Daftarkan sebagai global guard

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.listen(process.env.PORT ?? 3000);
}
bootstrap();
