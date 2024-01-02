const AUTH_BASE_URL = '/auth/v2/'

export const AuthUrl = new Proxy(
	{
		Onboard: 'onboard',
		Verify: 'verify',
		Resend: 'resend',
	},
	{
		// @ts-expect-error property has type any
		get: (target, property) => `${AUTH_BASE_URL}${target[property]}`,
	}
)
