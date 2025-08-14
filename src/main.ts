import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const jwtAuthGuard = app.get(JwtAuthGuard); // Ambil dari container Nest

	app.useGlobalGuards(jwtAuthGuard); // Daftarkan sebagai global guard

	app.listen(process.env.PORT ?? 3000);
}
bootstrap();
