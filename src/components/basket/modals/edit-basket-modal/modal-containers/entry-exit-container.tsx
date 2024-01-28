import {
	Flex,
	TimePicker,
	Card,
	theme,
	Typography,
	TimePickerProps,
} from 'antd'
import dayjs from 'dayjs'
import { SavedBasket } from '../../../types/types'
import { useBasketStore } from 'src/components/basket/store/basket-store'
import { useValidateTimes } from '../modal-hooks/useValidateTimes'
import { getDisabledTimeByExchange } from 'src/common/utils/date-time-utils'
import { getTimes } from 'src/components/basket/utils/get-times'
const format = 'HH:mm'
interface EntryExitProps {
	basketData: SavedBasket
	setBasketData: (val: SavedBasket) => void
}

const EntryExit: React.FC<EntryExitProps> = ({ basketData, setBasketData }) => {
	const { token } = theme.useToken()
	const { setTimeError, timeError } = useBasketStore()
	const disabledHours = getDisabledTimeByExchange(basketData.exchange)

	const handleEntryTimeChange: TimePickerProps['onChange'] = (time) => {
		const timeValue = time || getTimes(basketData.exchange, 'start')
		setBasketData({
			...basketData,
			entryCondition: {
				exitTime: basketData.entryCondition!.exitTime,
				entryTime: timeValue,
			},
		})
	}

	const handleExitTimeChange: TimePickerProps['onChange'] = (time) => {
		const timeValue = time || getTimes(basketData.exchange, 'end')
		setBasketData({
			...basketData,
			entryCondition: {
				entryTime: basketData.entryCondition!.entryTime,
				exitTime: timeValue,
			},
		})
	}

	useValidateTimes(basketData.entryCondition!, setTimeError)

	return (
		<Flex flex={1} justify="space-around">
			<Card
				bordered={true}
				size="small"
				title={
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							color: token.colorPrimary,
						}}
						children="Entry Time"
					/>
				}
			>
				<Flex flex="1" justify="center">
					<TimePicker
						style={{ border: timeError ? '1px solid red' : '' }}
						disabledTime={disabledHours}
						value={dayjs(basketData.entryCondition?.entryTime, format)}
						format={format}
						hideDisabledOptions={true}
						showNow={false}
						onChange={handleEntryTimeChange}
					/>
				</Flex>
			</Card>

			<Card
				title={
					<Typography.Text
						style={{
							fontSize: token.fontSizeSM,
							color: token.colorPrimary,
						}}
						children="Exit Time"
					/>
				}
				bordered={true}
				size="small"
			>
				<Flex flex="1" justify="center">
					<TimePicker
						style={{ border: timeError ? '1px solid red' : '' }}
						disabledTime={disabledHours}
						value={dayjs(basketData.entryCondition?.exitTime, format)}
						format={format}
						showNow={false}
						hideDisabledOptions={true}
						onChange={handleExitTimeChange}
					/>
				</Flex>
			</Card>
		</Flex>
	)
}

export default EntryExit
