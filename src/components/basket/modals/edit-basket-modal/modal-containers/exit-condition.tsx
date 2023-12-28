import { Divider, Flex, theme, Typography } from 'antd'
import ProfitLoss from './profit-loss-section'
//import EntryExit from './entry-exit-container'
import TradeSection from './trade-section'
import {
	BasketDataProps,
	SavedBasketsObject,
} from 'src/components/basket/types/types'
interface ExitConditionProps {
	basket: BasketDataProps[]
	basketData: SavedBasketsObject
	setBasketData: (val: SavedBasketsObject) => void
}
const ExitCondition: React.FC<ExitConditionProps> = ({
	basket,
	basketData,
	setBasketData,
}) => {
	const { token } = theme.useToken()
	return (
		<>
			{basket.length > 0 && (
				<Flex flex={1} vertical gap="middle">
					<Divider>
						<Typography.Text
							style={{
								color: token.colorPrimary,
								fontSize: token.fontSizeLG,
								fontWeight: token.fontWeightStrong,
							}}
						>
							Exit Parameters
						</Typography.Text>
					</Divider>
					<Flex flex={1}>
						<Flex flex={1} vertical>
							<Divider>
								<Typography.Text style={{ color: token.colorPrimary }}>
									Trade Selector
								</Typography.Text>
							</Divider>

							<TradeSection
								basketData={basketData}
								setBasketData={setBasketData}
							/>
						</Flex>
						<Flex flex={1} vertical>
							<Divider>
								<Typography.Text style={{ color: token.colorPrimary }}>
									Profit-Loss
								</Typography.Text>
							</Divider>
							<ProfitLoss
								basketData={basketData}
								setBasketData={setBasketData}
								profitLabel="Total Profit"
								lossLabel="Total Loss"
							/>
						</Flex>
					</Flex>
					{/* <Flex flex={1}>
				{/* <EntryExit
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
			</Flex> */}
				</Flex>
			)}
		</>
	)
}

export default ExitCondition
