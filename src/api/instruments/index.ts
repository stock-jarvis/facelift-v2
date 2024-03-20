import dayjs from 'dayjs'
import ApiService from '../ApiService'
import { GetInstrumentRes, GetInstrumentTradingDaysRes } from './types'
import { notification } from 'antd'

const InstrumentService = {
	async getInstrument(date: Date) {
		const parsedDate = dayjs(date).format('DD-MM-YYYY')

		try {
			const res = await ApiService.fetchData<GetInstrumentRes, unknown>({
				url: `simulator/GetInstrumentList?date=${parsedDate}`,
				method: 'get',
			})
			return res.data
		} catch (err) {
			notification.error({
				message: 'Error while trying to get instrument list.',
			})
			console.error(err)
		}
	},
	async getTradingDatesByInstrument(instrument: string) {
		try {
			const res = await ApiService.fetchData<
				GetInstrumentTradingDaysRes,
				unknown
			>({
				url: `/drl/GetTradingDatesByInstrument?inst=${instrument.toUpperCase()}`,
				method: 'get',
			})
			return res.data
		} catch (err) {
			notification.error({
				message: `Could not fetch trading days for ${instrument} instrument.`,
			})
			console.error(err)
		}
	},
}

export default InstrumentService
