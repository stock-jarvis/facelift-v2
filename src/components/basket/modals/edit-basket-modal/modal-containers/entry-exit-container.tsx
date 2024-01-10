import {
	Flex,
	TimePicker,
	Card,
	theme,
	Typography,
	TimePickerProps,
	CardProps,
} from 'antd'
import dayjs from 'dayjs'
import { SavedBasket } from '../../../types/types'
import { useBasketStore } from 'src/components/basket/store/basket-store'
import { useValidateTimes } from '../modal-hooks/useValidateTimes'
import { getDisabledTimeByExchange } from 'src/common/utils/date-time-utils'

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
		setBasketData({
			...basketData,
			entryCondition: {
				exitTime: basketData.entryCondition!.exitTime,
				entryTime: time!,
			},
		})
	}

	const handleExitTimeChange: TimePickerProps['onChange'] = (time) => {
		setBasketData({
			...basketData,
			entryCondition: {
				entryTime: basketData.entryCondition!.entryTime,
				exitTime: time!,
			},
		})
	}

	useValidateTimes(basketData.entryCondition!, setTimeError)

	const StartTimeProps: TimePickerProps = {
		style: { border: timeError ? '1px solid red' : '' },
		disabledTime: disabledHours,
		value: dayjs(basketData.entryCondition?.entryTime, format),
		format: format,
		hideDisabledOptions: true,
		showNow: false,
		onChange: handleEntryTimeChange,
	}

	const ExitTimeProps: TimePickerProps = {
		style: { border: timeError ? '1px solid red' : '' },
		disabledTime: disabledHours,
		value: dayjs(basketData.entryCondition?.exitTime, format),
		format: format,
		showNow: false,
		hideDisabledOptions: true,
		onChange: handleExitTimeChange,
	}

	const entryTitle: CardProps['title'] = (
		<Typography.Text
			style={{
				fontSize: token.fontSizeSM,
				color: token.colorPrimary,
			}}
			children="Entry Time"
		/>
	)

	const exitTitle: CardProps['title'] = (
		<Typography.Text
			style={{
				fontSize: token.fontSizeSM,
				color: token.colorPrimary,
			}}
			children="Exit Time"
		/>
	)

	const displayCardProps: CardProps = {
		bordered: true,
		size: 'small',
	}

	return (
		<Flex flex={1} justify="space-around">
			<Card {...displayCardProps} title={entryTitle}>
				<Flex flex="1" justify="center">
					<TimePicker {...StartTimeProps} />
				</Flex>
			</Card>

			<Card title={exitTitle} {...displayCardProps}>
				<Flex flex="1" justify="center">
					<TimePicker {...ExitTimeProps} />
				</Flex>
			</Card>
		</Flex>
	)
}

export default EntryExit
