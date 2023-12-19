import { Flex } from 'antd'
import ProfitLoss from './profit-loss-section'
import EntryExit from './entry-exit-container'
import TradeSection from './trade-section'
import { TimeHours, Time } from 'src/components/basket/types/types'
interface ExitConditionProps {
	entryHoursData: TimeHours[] | undefined
	entryMinutesData: Time[] | undefined
	entryHourValue: number
	entryMinuteValue: number
	exitHoursData: TimeHours[] | undefined
	exitMinutesData: Time[] | undefined
	exitHourValue: number
	exitMinuteValue: number
	exchange: string | undefined
	profitValue: number
	lossValue: number
	basketTradeType: string
	moveSl: boolean
	setRepeatSl: (val: string) => void
	setMoveSl: (val: boolean) => void
	handleBasketTradeTypeChange: (val: string) => void
	handleLossValueChange: (val: number) => void
	handleProfitValueChange: (val: number) => void
	handleExitMinuteListChange: (list: Time[]) => void
	handleEntryMinuteListChange: (list: Time[]) => void
	handleChangeExitHour: (val: number) => void
	handleChangeExitMinute: (val: number) => void
	handleChangeEntryMinute: (val: number) => void
	handleChangeEntryHour: (val: number) => void
}
const ExitCondition = ({
	exchange,
	entryHoursData,
	entryMinutesData,
	entryHourValue,
	entryMinuteValue,
	exitHoursData,
	exitMinutesData,
	exitHourValue,
	exitMinuteValue,
	profitValue,
	lossValue,
	basketTradeType,
	moveSl,
	setRepeatSl,
	setMoveSl,
	handleBasketTradeTypeChange,
	handleLossValueChange,
	handleProfitValueChange,
	handleEntryMinuteListChange,
	handleExitMinuteListChange,
	handleChangeExitHour,
	handleChangeExitMinute,
	handleChangeEntryMinute,
	handleChangeEntryHour,
}: ExitConditionProps) => {
	return (
		<Flex flex={1} vertical gap="middle">
			<Flex flex={1}>
				<Flex flex={1}>
					<TradeSection
						move={moveSl}
						setRepeat={setRepeatSl}
						setMove={setMoveSl}
						toggleValue={basketTradeType}
						setToggleValue={handleBasketTradeTypeChange}
					/>
				</Flex>
				<Flex flex={1}>
					<ProfitLoss
						profitValue={profitValue}
						lossValue={lossValue}
						setLossValue={handleLossValueChange}
						setProfitValue={handleProfitValueChange}
						profitLabel="Total Profit"
						lossLabel="Total Loss"
					/>
				</Flex>
			</Flex>
			<Flex flex={1}>
				<EntryExit
					exchange={exchange}
					entryHoursData={entryHoursData}
					entryMinutesData={entryMinutesData}
					entryHourValue={entryHourValue}
					exitHoursData={exitHoursData}
					exitMinutesData={exitMinutesData}
					exitHourValue={exitHourValue}
					exitMinuteValue={exitMinuteValue}
					handleChangeExitHour={handleChangeExitHour}
					handleExitMinuteListChange={handleExitMinuteListChange}
					handleEntryMinuteListChange={handleEntryMinuteListChange}
					handleChangeExitMinute={handleChangeExitMinute}
					handleChangeEntryHour={handleChangeEntryHour}
					entryMinuteValue={entryMinuteValue}
					handleChangeEntryMinute={handleChangeEntryMinute}
				/>
			</Flex>
		</Flex>
	)
}

export default ExitCondition
