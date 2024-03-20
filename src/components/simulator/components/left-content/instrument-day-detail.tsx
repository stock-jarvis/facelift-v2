import { Flex } from 'antd'
import TitleValue from 'src/common/components/title-value'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { useQuery } from '@tanstack/react-query'
import SimulatorService from 'src/api/simulator'
import {
	getDayOpenLabel,
	getDayPriceDiffInPercent,
} from 'src/common/utils/conversion-utils'
import useGetSpotData from 'src/api/simulator/hooks/use-get-spot-data'

const InstrumentDayDetail = () => {
	const { exchange, activeInstrument, date, time } = useSimulatorParamsStore()

	const { data } = useGetSpotData(date, time, exchange, activeInstrument)

	const { data: lotSizeData } = useQuery({
		queryKey: ['lot-size', date, activeInstrument],
		queryFn: () =>
			SimulatorService.fetchLotSize(
				activeInstrument,
				date.format('DD-MM-YYYY')
			),
	})
	console.log(lotSizeData)

	const dayOpenDiff = getDayPriceDiffInPercent(data?.DO || 0, data?.PDC || 0)

	return (
		<Flex className="w-full" justify="space-between">
			<Flex flex={1} justify="flex-start">
				<TitleValue
					title="Day Open"
					value={getDayOpenLabel(data?.DO, data?.PDC, dayOpenDiff)}
					valueProps={{ type: dayOpenDiff >= 0 ? 'success' : 'danger' }}
				/>
			</Flex>

			<Flex flex={1} justify="center">
				<TitleValue title="Lot Size" value="25" />
			</Flex>

			<Flex flex={1} justify="flex-end">
				<TitleValue title="Prev Close" value={data?.PDC?.toString() || 'NIL'} />
			</Flex>
		</Flex>
	)
}

export default InstrumentDayDetail
