const AUTH_BASE_URL = '/auth/v2/'

export const AuthUrl = new Proxy(
	{
		Login: 'login',
		Verify: 'verify',
		Resend: 'resend',
		Onboard: 'onboard',
	},
	{
		// @ts-expect-error property has type any
		get: (target, property) => `${AUTH_BASE_URL}${target[property]}`,
	}
)
