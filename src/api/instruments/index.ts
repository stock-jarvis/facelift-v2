import dayjs from 'dayjs'
import ApiService from '../ApiService'
import { InstrumentList } from './types'

const InstrumentService = {
	getInstrument(date: Date) {
		const parsedDate = dayjs(date).format('DD-MM-YYYY')

		return ApiService.fetchData<InstrumentList, unknown>({
			url: `simulator/GetInstrumentList?date=${parsedDate}`,
			method: 'get',
		})
	},
}

export default InstrumentService
