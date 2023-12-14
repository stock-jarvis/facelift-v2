import { Flex } from 'antd'

import TitleValue from 'src/common/key-value'

// TODO: Wire up data
const InstrumentDayDetail = () => {
	return (
		<Flex className="w-full" justify="space-between">
			<TitleValue
				title="Day Open"
				value="39000 (0)%"
				valueProps={{ type: 'success' }}
			/>

			<TitleValue title="Lot Size" value="25" />

			<TitleValue title="Prev Close" value="38000" />
		</Flex>
	)
}

export default InstrumentDayDetail
