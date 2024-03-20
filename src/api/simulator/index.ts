import ApiService from '../ApiService'
import { SpotDataRes, SpotDataReq, LotSizeRes, AIOCRes, AIOCReq } from './types'

const SimulatorService = {
	async fetchSpotData(request: SpotDataReq) {
		const parsedReq = {
			...request,
			date: request.date.format('DD-MM-YYYY'),
			time: request.time.format('HH:mm:ss'),
		}

		try {
			const res = await ApiService.fetchData<SpotDataRes, typeof parsedReq>({
				url: `simulator/FetchSpot`,
				method: 'post',
				data: parsedReq,
			})
			return res.data
		} catch (err) {
			console.error(`Failed to fetch spot data: ${err}`)
		}
	},
	async fetchLotSize(inst: string, date: string) {
		try {
			const res = await ApiService.fetchData<LotSizeRes, unknown>({
				url: `drl/GetLotSize?inst=${inst}&date=${date}`,
				method: 'get',
			})
			return res.data
		} catch (err) {
			console.error(`Failed to fetch lot size: ${err}`)
		}
	},
	async fetchAIOC(request: AIOCReq) {
		const parsedReq = {
			...request,
			date: request.date.format('DD-MM-YYYY'),
			time: request.time.format('HH:mm:ss'),
		}

		try {
			const res = await ApiService.fetchData<AIOCRes, typeof parsedReq>({
				url: 'simulator/FetchAIOC',
				method: 'post',
				data: parsedReq,
			})
			return res.data
		} catch (err) {
			console.error(`Failed to fetch AIOC data: ${err}`)
		}
	},
}

export default SimulatorService
