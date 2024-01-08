import MockAdapter from 'axios-mock-adapter'
import { AuthUrl } from '../auth'

export const setAxiosMocks = (mockAdapter: MockAdapter) => {
	mockAdapter
		.onPost(AuthUrl.Login, {
			phone: '9154646424',
			password: 'qwertyuiop',
		})
		.reply(202, {
			Status: 200,
			Token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ3MjgxMTksImlzcyI6IlJBdUciLCJQaG9uZSI6IjkxNTQ2NDY0MjQiLCJFbWFpbCI6InBvbG9qdXJpc2hpdGhAZ21haWwuY29tIn0.btx-HT9O5i1X8RfizAUP5Ny3-SrKDpZaJClBSx2r_JE',
		})
}
