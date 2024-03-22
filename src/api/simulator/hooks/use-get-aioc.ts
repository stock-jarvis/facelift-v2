import { useQuery, useQueryClient } from '@tanstack/react-query'
import SimulatorService from '..'
import { AIOCReq } from '../types'
import { useEffect } from 'react'

const useGetAIOCData = (
	date: AIOCReq['date'],
	time: AIOCReq['time'],
	exc: AIOCReq['exc'],
	inst: AIOCReq['inst'],
	exps: AIOCReq['exps'] = []
) => {
	const queryClient = useQueryClient()

	const request: AIOCReq = {
		date,
		time,
		exc,
		inst,
		exps: exps.filter(Boolean),
	}

	const query = useQuery({
		queryKey: ['AIOC', request],
		queryFn: () => SimulatorService.fetchAIOC(request),
		staleTime: 900 * 1000,
	})

	useEffect(() => {
		// Store the default expiry result returned when `exp = []`
		if (request.exps.length == 0) {
			const newRequest = { ...request, exps: [query.data?.expList[0]] }
			queryClient.setQueryData(['AIOC', newRequest], query.data)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.data, queryClient])

	return query
}

export default useGetAIOCData
