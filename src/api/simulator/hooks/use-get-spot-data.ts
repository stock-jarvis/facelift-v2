import { useQuery } from '@tanstack/react-query'
import SimulatorService from '..'
import { SpotDataReq } from '../types'

const useGetSpotData = (
	date: SpotDataReq['date'],
	time: SpotDataReq['time'],
	exc: SpotDataReq['exc'],
	inst: SpotDataReq['inst']
) => {
	const request: SpotDataReq = {
		date,
		time,
		exc,
		inst,
	}

	return useQuery({
		queryKey: ['spot-data', request],
		queryFn: () => SimulatorService.fetchSpotData(request),
	})
}

export default useGetSpotData
