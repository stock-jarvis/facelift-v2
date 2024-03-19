import axios from 'axios'
import deepParseJson from 'src/common/utils/deepParseJson'
import {
	API_BASE_URL,
	PERSIST_STORE_NAME,
	REQUEST_HEADER_AUTH_KEY,
	TOKEN_TYPE,
} from './const'
import safeLocalStorage from 'src/common/utils/local-storage'
import { LOCAL_STORAGE } from 'src/common/local-storage-keys'
import { LoginUserRes } from 'src/common/types'

const unauthorizedCode = [401]

const BaseService = axios.create({
	timeout: 60000,
	baseURL: API_BASE_URL,
})

BaseService.interceptors.request.use(
	(config) => {
		const sessionData = safeLocalStorage.get<LoginUserRes>(
			LOCAL_STORAGE.SESSION_INFO
		)

		const accessToken = sessionData?.Token

		// if (!accessToken) {
		//     const { auth } = store.getState()
		//     accessToken = auth.sessionx.token
		// }

		if (accessToken) {
			config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// signout when unauthorised needs to be setup in the store.
BaseService.interceptors.response.use(
	(response) => response,
	(error) => {
		const { response } = error

		if (response && unauthorizedCode.includes(response.status)) {
			//store.dispatch(signOutSuccess())
			console.error('Unauthorised')
		}

		return Promise.reject(error)
	}
)

export default BaseService
