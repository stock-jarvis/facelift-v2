import { Flex } from 'antd'
import TitleValue from 'src/common/components/title-value'

const InstrumentDayDetail = () => {
	return (
		<Flex className="w-full" justify="space-between">
			<Flex flex={1} justify="flex-start">
				<TitleValue
					title="Day Open"
					// TODO: Wire up data
					value="39000 (0)%"
					// TODO: Change type based on value
					valueProps={{ type: 'success' }}
				/>
			</Flex>

			<Flex flex={1} justify="center">
				{/* // TODO: Wire up data */}
				<TitleValue title="Lot Size" value="25" />
			</Flex>

			<Flex flex={1} justify="flex-end">
				{/* // TODO: Wire up data */}
				<TitleValue title="Prev Close" value="38000" />
			</Flex>
		</Flex>
	)
}

export default InstrumentDayDetail
