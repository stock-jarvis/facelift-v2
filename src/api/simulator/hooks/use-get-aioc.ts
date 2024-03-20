import { useQuery } from '@tanstack/react-query'
import SimulatorService from '..'
import { AIOCReq } from '../types'

const useGetAIOCData = (
	date: AIOCReq['date'],
	time: AIOCReq['time'],
	exc: AIOCReq['exc'],
	inst: AIOCReq['inst'],
	exps: AIOCReq['exps'] = []
) => {
	const request: AIOCReq = {
		date,
		time,
		exc,
		inst,
		exps: exps.filter(Boolean),
	}

	return useQuery({
		queryKey: ['AIOC', request],
		queryFn: () => SimulatorService.fetchAIOC(request),
	})
}

export default useGetAIOCData
