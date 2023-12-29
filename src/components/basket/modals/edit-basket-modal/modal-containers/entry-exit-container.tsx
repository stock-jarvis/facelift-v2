import {
	Flex,
	TimePicker,
	Card,
	theme,
	Typography,
	TimePickerProps,
} from 'antd'
import dayjs from 'dayjs'
import { Exchange } from 'src/common/enums'
import { SavedBasketsObject } from '../../../types/types'
const format = 'HH:mm'

import { getDisabledTimeByExchange } from 'src/common/utils/date-time-utils'
interface EntryExitProps {
	basketData: SavedBasketsObject
	setBasketData: (val: SavedBasketsObject) => void
}
const EntryExit: React.FC<EntryExitProps> = ({ basketData, setBasketData }) => {
	const { token } = theme.useToken()

	const handleEntryTimeChange: TimePickerProps['onChange'] = (val) => {
		const date = val?.format(format).toString()
		setBasketData({
			...basketData,
			entryCondition: {
				exitTime: basketData.entryCondition?.exitTime || '',
				entryTime: date || '',
			},
		})
	}

	const handleExitTimeChange: TimePickerProps['onChange'] = (val) => {
		const date = val?.format(format).toString()
		setBasketData({
			...basketData,
			entryCondition: {
				entryTime: basketData.entryCondition?.entryTime || '',
				exitTime: date || '',
			},
		})
	}
	return (
		<Flex flex={1} justify="space-around">
			<Card
				title={
					<Flex flex={1} justify="center">
						<Typography.Text
							style={{ fontSize: token.fontSizeSM, color: token.colorPrimary }}
						>
							Entry Time
						</Typography.Text>
					</Flex>
				}
				bordered
				size="small"
			>
				<Flex flex="1" justify="center">
					<TimePicker
						value={dayjs(basketData.entryCondition?.entryTime, format)}
						format={format}
						onChange={handleEntryTimeChange}
					/>
				</Flex>
			</Card>

			<Card
				title={
					<Flex flex={1} justify="center">
						<Typography.Text
							style={{ fontSize: token.fontSizeSM, color: token.colorPrimary }}
						>
							Exit Time
						</Typography.Text>
					</Flex>
				}
				bordered
				size="small"
			>
				<Flex flex="1" justify="center">
					<TimePicker
						disabledTime={getDisabledTimeByExchange(
							basketData.exchange as Exchange
						)}
						value={dayjs(basketData.entryCondition?.exitTime, format)}
						format={format}
						onChange={handleExitTimeChange}
					/>
				</Flex>
			</Card>
		</Flex>
	)
}

export default EntryExit
