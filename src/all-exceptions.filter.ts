import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message: string | string[] = 'Internal server error';

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const res = exception.getResponse();
			type ExceptionResponse = { message?: string | string[] };
			message =
				typeof res === 'string'
					? res
					: typeof res === 'object' && res !== null && 'message' in res
						? ((res as ExceptionResponse).message ?? 'Internal server error')
						: 'Internal server error';
		}

		response.status(status).json({
			statusCode: status,
			error: status === 400 ? 'Validation Error' : 'Server Error',
			messages: Array.isArray(message) ? message : [message],
		});
	}
}
