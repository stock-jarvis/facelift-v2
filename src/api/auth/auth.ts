import {
	MutationFunction,
	useMutation,
	useQuery,
	QueryFunction,
} from 'react-query'

import axios from '../axios'
import { AuthUrl } from 'api/auth'

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
}

const onboard: MutationFunction<OnboardResponse, OnboardPayload> = async (
	onboardPayload
) => {
	// return (
	// 	await axios.post<OnboardResponse>(
	// 		AuthUrl.Onboard,
	// 		onboardPayload
	// 	)
	// ).data

	// Dev
	return new Promise((resolve) =>
		setTimeout(() => resolve({ nonce: 'nonce-value' }), 1000)
	)
}

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

// TODO: Define Verify Response

const verify: MutationFunction<unknown, VerifyPayload> = async (
	verifyPayload
) => {
	// return (await axios.post(AuthUrl.Verify, verifyPayload)).data

	// Dev
	return new Promise((resolve) => setTimeout(() => resolve({}), 1000))
}

export const useVerifyMutation = () =>
	useMutation({
		mutationFn: verify,
		mutationKey: AuthUrl.Verify,
	})

/************************* Verify ***************************/
type ResendOTPPayload = Pick<VerifyPayload, 'nonce'>

// TODO: Define Resend OTP Response

const resendOTP: MutationFunction<unknown, ResendOTPPayload> = async (
	resendOTPPayload
) => {
	// return (await axios.post(AuthUrl.Resend, resendOTPPayload)).data

	// Dev
	return new Promise((resolve) => setTimeout(() => resolve({}), 1000))
}

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

// TODO: Define Response

const login: MutationFunction<unknown, LoginPayload> = async (loginPayload) => {
	// return (await axios.post(AuthUrl.Login, loginPayload)).data

	// Dev
	return new Promise((resolve) => setTimeout(() => resolve({}), 1000))
}

export const useLoginMutation = () =>
	useMutation({
		mutationFn: login,
		mutationKey: AuthUrl.Login,
	})
