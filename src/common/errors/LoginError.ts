export class LoginError extends Error {
	constructor(message?: string) {
		super(message ?? 'Failed to Login.')
	}
}
