import ApiService from './ApiService'

import { LoginUserType } from 'src/common/components/forms/login-form'
import {
	NonceFormType,
	NonceType,
} from 'src/common/components/forms/nonce-form'
import { SignUpUserType } from 'src/common/components/forms/sign-up-form'

export async function apiPostLogin<T>(data: LoginUserType) {
	return ApiService.fetchData<T>({
		url: `/auth/v2/login`,
		method: 'post',
		data,
	})
}

export async function apiPostSignUp<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `/auth/v2/onboard`,
		method: 'post',
		data,
	})
}

export async function apiPostNonce<T>(data: NonceType & NonceFormType) {
	return ApiService.fetchData<T>({
		url: `/auth/v2/verify`,
		method: 'post',
		data,
	})
}

export async function apiPostNonceReSend<T>(data: NonceType) {
	return ApiService.fetchData<T>({
		url: `/auth/v2/resend`,
		method: 'post',
		data,
	})
}
