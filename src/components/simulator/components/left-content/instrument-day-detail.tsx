import { Flex } from 'antd'

import TitleValue from 'src/common/components/key-value'

const InstrumentDayDetail = () => {
	return (
		<Flex className="w-full" justify="space-between">
			<TitleValue
				title="Day Open"
				// TODO: Wire up data
				value="39000 (0)%"
				// TODO: Change type based on value
				valueProps={{ type: 'success' }}
			/>

			{/* // TODO: Wire up data */}
			<TitleValue title="Lot Size" value="25" />

			{/* // TODO: Wire up data */}
			<TitleValue title="Prev Close" value="38000" />
		</Flex>
	)
}

export default InstrumentDayDetail
