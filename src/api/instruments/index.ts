import dayjs from 'dayjs'
import ApiService from '../ApiService'
import { GetInstrumentRes } from './types'
import { notification } from 'antd'

const InstrumentService = {
	getInstrument(date: Date) {
		const parsedDate = dayjs(date).format('DD-MM-YYYY')

		return ApiService.fetchData<GetInstrumentRes, unknown>({
			url: `simulator/GetInstrumentList?date=${parsedDate}`,
			method: 'get',
		})
			.then((res) => res.data)
			.catch((err) => {
				notification.error({
					message: 'Error while trying to get instrument list.',
				})
				console.error(err)
			})
	},
}

export default InstrumentService
