import { SavedBasket } from './../components/basket/types/types'
import ApiService from './ApiService'

import { LoginUserType } from 'src/common/components/forms/login-form'
import {
	NonceFormType,
	NonceType,
} from 'src/common/components/forms/nonce-form'
import { SignUpUserType } from 'src/common/components/forms/sign-up-form'
import axios from 'axios'
import { LOCAL_STORAGE } from 'src/common/local-storage-keys'
import { API_BASE_URL } from 'src/api/const'

const authTokenJSON = JSON.parse(
	localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
)

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
export async function SignUpAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `/auth/Onboard`,
		method: 'post',
		data,
	})
}
export async function OtpVerifyAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `/auth/Verify`,
		method: 'post',
		data,
	})
}
export async function LoginAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `/auth/Login`,
		method: 'post',
		data,
	})
}

export async function ResendAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `auth/Resend`,
		method: 'post',
		data,
	})
}
export async function ForgetAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `auth/InitReset`,
		method: 'post',
		data,
	})
}
export async function ResetPassAPI<T>(data: SignUpUserType) {
	return ApiService.fetchData<T>({
		url: `auth/Reset`,
		method: 'post',
		data,
	})
}

export async function fetchDataFromInstrumentAPI(authTokenJSON: any) {
	try {
		const response = await axios.get(
			`${API_BASE_URL}simulator/GetInstrumentList?date=12-01-2022`,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error) {
		throw new Error('Error While login')
	}
}

export async function SavedBasketAPI(data: any) {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	try {
		const response = await axios.post(
			`${API_BASE_URL}drl/basket/SaveBasket`,
			data,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error) {
		throw new Error('Error While login')
	}
}

export async function GetBasketAPI() {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	try {
		const response = await axios.get(
			`${API_BASE_URL}drl/basket/GetBasketList?cid=${authTokenJSON.UID}`,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error) {
		throw new Error('Error While login')
	}
}

export async function GetSpecificBasketAPI(data: string) {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	try {
		const response = await axios.get(
			`${API_BASE_URL}drl/basket/GetBasketDetails?cid=${authTokenJSON.UID}&name=${data}`,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error: any) {
		if (error.response.status == '500') return 2
		throw new Error('Error While login')
	}
}

export async function RunBasketAPI(name: string) {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	const cid = authTokenJSON.UID
	try {
		const response = await axios.post(
			`${API_BASE_URL}drl/basket/RunBasket`,
			{
				name,
				cid,
				from: '03-01-2022',
				to: '30-12-2022',
				// ,to:"01-01-2022",from:"30-12-2022"
				// const from = '03-01-2022'
				// 	const to = '30-12-2022'
			},
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error) {
		console.log({ error })
		throw new Error('Error While login')
	}
}

export async function GetBasketStatus(data: string) {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	try {
		const response = await axios.get(
			`${API_BASE_URL}drl/basket/GetBasketStatus?cid=${authTokenJSON.UID}&bid=${data}`,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error: any) {
		if (error.response.status == '500') return 2
		throw new Error('Error While login')
	}
}

export async function GetBasketReport(data: string) {
	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO) ?? '{}'
	)
	try {
		const response = await axios.get(
			`${API_BASE_URL}drl/basket/GetBasketReport?cid=${authTokenJSON.UID}&bid=${data}`,
			{
				headers: {
					Authorization: `Bearer ${authTokenJSON.Token}`,
				},
			}
		)
		return response.data
	} catch (error: any) {
		if (error.response.status == '500') return 2
		throw new Error('Error While login')
	}
}
