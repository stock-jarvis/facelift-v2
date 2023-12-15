import { Flex, Table } from 'antd'
import { Dayjs } from 'dayjs'
import { TradeAction } from 'src/components/simulator/types'

type Position = {
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	expiry: Dayjs
	entryPrice: number
	lastTradedPrice: number
	// TODO: Check data type from API
	// profitAndLoss: {
	// 	amount: number
	// 	percentage: number
	// }
}

const Positions = () => {
	return (
		<Flex className="w-full h-full" vertical>
			{/* // TODO: P&L Net Credit Break even Delta */}
			<Table className="w-full h-full" sticky={true} scroll={{ y: '100%' }} />
		</Flex>
	)
}

export default Positions
