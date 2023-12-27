import {
	Flex,
	Select,
	Typography,
	theme,
	Divider,
	Descriptions,
	DescriptionsProps,
} from 'antd'
import Toggle from '../modal-components/toggle'
import { SavedBasketsObject } from 'src/components/basket/types/types'

interface HeaderProps {
	basketData: SavedBasketsObject
	setBasketData: (val: SavedBasketsObject) => void
}
const Header = ({ basketData, setBasketData }: HeaderProps) => {
	const { token } = theme.useToken()

	const handleBasketExchangeChange = (val: string) => {
		setBasketData({ ...basketData, exchange: val })
	}

	const handleBasketTickerChange = (val: string) => {
		setBasketData({ ...basketData, ticker: val })
	}
	const handleBasketTypeChange = (val: string) => {
		setBasketData({ ...basketData, type: val })
	}
	const handleBasketAtmChange = (val: string) => {
		setBasketData({ ...basketData, atm: val })
	}
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
						value={basketData.exchange}
						size="large"
						onChange={handleBasketExchangeChange}
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
						value={basketData.ticker}
						onChange={handleBasketTickerChange}
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
						setToogleValue={handleBasketTypeChange}
						value={basketData.type}
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
						setToogleValue={handleBasketAtmChange}
						value={basketData.atm}
					/>
				</Flex>
			),
		},
	]

	return (
		<Flex vertical>
			<Divider>
				<Typography.Text
					style={{
						color: token.colorPrimary,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					{basketData.name}{' '}
					{basketData.identifier > 0 ? ` - ${basketData.identifier}` : ''}
				</Typography.Text>
			</Divider>
			<Descriptions items={items} bordered layout="vertical" />
		</Flex>
	)
}

export default Header
