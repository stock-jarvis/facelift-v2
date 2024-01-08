import { MutationFunction, useMutation } from 'react-query'

import axios from '../axios/axios'
import { AuthUrl } from 'api/auth'
import { LoginError } from 'src/common/errors'

/************************* Onboard ***************************/
type OnboardPayload = {
	email: string
	phone: string
	passwd: string
	name: string
	refCode?: string
}

type OnboardResponse = {
	nonce: string
	status: number
}

const onboard: MutationFunction<OnboardResponse, OnboardPayload> = async (
	onboardPayload
) => (await axios.post<OnboardResponse>(AuthUrl.Onboard, onboardPayload)).data

export const useOnboardMutation = () =>
	useMutation({
		mutationFn: onboard,
		mutationKey: AuthUrl.Onboard,
	})

/************************* Verify ***************************/
type VerifyPayload = {
	otp: string
	nonce: string
}

type VerifyResponse = {
	Status: number
}

const verify: MutationFunction<VerifyResponse, VerifyPayload> = async (
	verifyPayload
) => (await axios.post(AuthUrl.Verify, verifyPayload)).data

export const useVerifyMutation = () =>
	useMutation({
		mutationFn: verify,
		mutationKey: AuthUrl.Verify,
	})

/************************* Verify ***************************/
type ResendOTPPayload = Pick<VerifyPayload, 'nonce'>

type ResendResponse = {
	Status: number
	nonce: string
}

const resendOTP: MutationFunction<ResendResponse, ResendOTPPayload> = async (
	resendOTPPayload
) => (await axios.post(AuthUrl.Resend, resendOTPPayload)).data

export const useResendOTPMutation = () =>
	useMutation({
		mutationFn: resendOTP,
		mutationKey: AuthUrl.Resend,
	})

/************************* Login ***************************/
type LoginPayload = {
	phone: string
	password: string
}

export type LoginResponse = {
	Token: string
	Status: number
}

const login: MutationFunction<LoginResponse | undefined, LoginPayload> = async (
	loginPayload
) => {
	try {
		const response = await axios.post<LoginResponse>(
			AuthUrl.Login,
			loginPayload
		)
		if (response.data.Status !== 200) {
			throw new LoginError()
		} else {
			return response.data
		}
	} catch (e) {
		console.error(e)
		throw new LoginError()
	}
}

export const useLoginMutation = () =>
	useMutation({
		mutationFn: login,
		mutationKey: AuthUrl.Login,
	})
