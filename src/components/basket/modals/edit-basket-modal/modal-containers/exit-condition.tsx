import { Flex } from 'antd'
import ProfitLoss from './profit-loss-section'
import EntryExit from './entry-exit-container'
import TradeSection from './trade-section'

const ExitCondition = () => {
	return (
		<Flex flex={1} vertical gap="middle">
			<Flex flex={1}>
				<Flex flex={1}>
					<TradeSection />
				</Flex>
				<Flex flex={1}>
					<ProfitLoss
						profitValue={1}
						lossValue={1}
						setLossValue={() => {}}
						setProfitValue={() => {}}
						profitLabel="Total Profit"
						lossLabel="Total Loss"
					/>
				</Flex>
			</Flex>
			<Flex flex={1}>
				<EntryExit />
			</Flex>
		</Flex>
	)
}

export default ExitCondition
