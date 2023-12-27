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
	atm: string
	setAtm: (val: string) => void
	setBasketPositions: (val: string) => void
	handleTradeChange: (val: string) => void
	handleInstrumentChange: (val: string) => void
}
const Header = ({
	atm,
	trade,
	handleTradeChange,
	instrument,
	setAtm,
	setBasketPositions,
	handleInstrumentChange,
}: HeaderProps) => {
	//	console.log(atm)
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

			key: 'exhange',

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
			key: 'instrument',

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

			children: (
				<Flex flex={1} justify="center">
					<Toggle
						label1="INTRADAY"
						label2="POSITIONAL"
						toogle1="INTRA"
						toogle2="POS"
						setToogleValue={setBasketPositions}
						value="POS"
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

			children: (
				<Flex flex={1} justify="center">
					<Toggle
						label1="Spot as ATM"
						label2="Future as ATM"
						toogle1="spot"
						toogle2="future"
						setToogleValue={setAtm}
						value={atm}
					/>
				</Flex>
			),
		},
	]

	return <Descriptions items={items} bordered layout="vertical" />
}

export default Header
