import { Flex } from 'antd'
import PositionsTable from './positions-table'

const Positions = () => {
	return (
		<Flex className="w-full h-full" vertical>
			{/* // TODO: P&L Net Credit Break even Delta */}
			<PositionsTable />
		</Flex>
	)
}

export default Positions
