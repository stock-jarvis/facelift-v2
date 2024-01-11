import axiosLib, { HttpStatusCode } from 'axios'
import { setAxiosMocks } from './mocks'

const axios = axiosLib.create({
	baseURL: import.meta.env.SYSTEM_TRADE_BASE_URL,
})

export const setAuthorizationHeader = (authorizationHeader: string | null) => {
	axios.interceptors.request.use((config) => {
		config.headers.Authorization = authorizationHeader
		return config
	})
}

export const invalidateToken = (afterTokenInvalidate: () => void) => {
	axios.interceptors.response.use(
		(config) => config,
		(err) => {
			if (err.response.status === HttpStatusCode.Unauthorized) {
				setAuthorizationHeader(null)
				afterTokenInvalidate()
			}
			return err
		}
	)
}

/** Enable to mock request response for development */
if (import.meta.env.MODE === 'development') {
	const mockAdapterPromise = import('axios-mock-adapter')

	mockAdapterPromise.then(({ default: MockAdapter }) => {
		const mockAdapter = new MockAdapter(axios)

		setAxiosMocks(mockAdapter)
	})
}

export default axios
