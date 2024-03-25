import { useQuery } from '@tanstack/react-query'
import SimulatorService from '..'
import { LotSizeRes, SpotDataReq } from '../types'
import { convertLotSizeRes } from 'src/common/utils/conversion-utils'
import { rootQueryClient } from 'src/lib/queryClient'

const useGetLotSize = (
	date: SpotDataReq['date'],
	inst: SpotDataReq['inst']
) => {
	return useQuery({
		queryKey: ['lot-size', date, inst],
		queryFn: () =>
			SimulatorService.fetchLotSize(inst, date.format('DD-MM-YYYY')),
		select: (data) => convertLotSizeRes(data),
	})
}

export const getCachedLotSize = (
	date: SpotDataReq['date'],
	inst: SpotDataReq['inst']
) => {
	const data: LotSizeRes | undefined = rootQueryClient.getQueryData([
		'lot-size',
		date,
		inst,
	])
	return convertLotSizeRes(data)
}

export { useGetLotSize }
