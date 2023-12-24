import {
	Flex,
	Select,
	Typography,
	theme,
	Descriptions,
	DescriptionsProps,
} from 'antd'
import Toggle from '../modal-components/toggle'

interface HeaderProps {
	trade: string | undefined
	instrument: string | undefined
	setAtm: (val: string) => void
	setBasketPositions: (val: string) => void
	handleTradeChange: (val: string) => void
	handleInstrumentChange: (val: string) => void
}
const Header = ({
	trade,
	handleTradeChange,
	instrument,
	setAtm,
	setBasketPositions,
	handleInstrumentChange,
}: HeaderProps) => {
	const { token } = theme.useToken()
	const items: DescriptionsProps['items'] = [
		{
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
						Exchange
					</Typography.Text>
				</Flex>
			),
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			key: 'position',
			children: (
				<Flex flex={1} justify="center">
					<Select
						value={trade}
						size="large"
						onChange={handleTradeChange}
						options={[
							{ id: 1, label: 'NSE', value: 'NSE' },
							{ id: 2, label: 'MCX', value: 'MCX' },
							{ id: 3, label: 'CUR', value: 'CUR' },
						]}
					/>
				</Flex>
			),
		},
		{
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
						Instrument
					</Typography.Text>
				</Flex>
			),
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			key: 'atm',
			children: (
				<Flex flex={1} justify="center">
					<Select
						size="large"
						value={instrument}
						onChange={handleInstrumentChange}
						options={[
							{ id: 1, value: 'Ticker-1', label: 'Ticker-1' },
							{ id: 2, value: 'Ticker-2', label: 'Ticker-2' },
							{ id: 3, value: 'Ticker-3', label: 'Ticker-3' },
							{ id: 4, value: 'Ticker-4', label: 'Ticker-4' },
						]}
					/>
				</Flex>
			),
		},
		{
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
						Position
					</Typography.Text>
				</Flex>
			),
			key: 'position',
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			children: (
				<Flex flex={1} justify="center">
					<Toggle
						label1="INTRADAY"
						label2="POSITIONAL"
						toogle1="INTRA"
						toogle2="POS"
						setToogleValue={setBasketPositions}
					/>
				</Flex>
			),
		},
		{
			label: (
				<Flex flex={1} justify="center">
					<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
						ATM
					</Typography.Text>
				</Flex>
			),
			key: 'atm',
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			children: (
				<Flex flex={1} justify="center">
					<Toggle
						label1="Spot as ATM"
						label2="Future as ATM"
						toogle1="spot"
						toogle2="future"
						setToogleValue={setAtm}
					/>
				</Flex>
			),
		},
	]

	return <Descriptions items={items} bordered />
}

export default Header
