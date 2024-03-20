import {
	Flex,
	Select,
	Typography,
	theme,
	Divider,
	Descriptions,
	DescriptionsProps,
	notification,
} from 'antd'
import dayjs from 'dayjs'
import Toggle from '../modal-components/toggle'
import { SavedBasket } from 'src/components/basket/types/types'
import { getTimes } from 'src/components/basket/utils/get-times'
import { Exchange, BasketType, BasketAtm } from 'src/common/enums'
import { exchangeType } from 'src/components/basket/constants/data'
import { fetchDataFromInstrumentAPI } from 'src/api/AuthService'
import { useEffect, useState } from 'react'
import { LOCAL_STORAGE } from 'src/common/local-storage-keys'

interface HeaderProps {
	basketData: SavedBasket
	setBasketData: (val: SavedBasket) => void
}
const Header: React.FC<HeaderProps> = ({ basketData, setBasketData }) => {
	const { token } = theme.useToken()
	const [instrumentData, setInstrumentData] = useState<
		{ value: string; label: string }[]
	>([])
	const handleBasketExchangeChange = (val: Exchange) => {
		setBasketData({
			...basketData,
			exchange: val,
			entryCondition: {
				exitTime: dayjs(getTimes(val, 'end')),
				entryTime: dayjs(getTimes(val, 'start')),
			},
		})
	}

	const handleBasketTickerChange = (val: string) => {
		setBasketData({ ...basketData, ticker: val })
	}
	const handleBasketTypeChange = (val: BasketType) => {
		setBasketData({ ...basketData, type: val })
	}
	const handleBasketAtmChange = (val: BasketAtm) => {
		setBasketData({ ...basketData, atm: val })
	}

	useEffect(() => {
		fetchData()
	}, [])

	const authTokenJSON = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE.SESSION_INFO)
	)
	const fetchData = async () => {
		try {
			const response = await fetchDataFromInstrumentAPI(authTokenJSON)
			const tickerData = response.InstrumentList.map(
				(instrument: any, index: any) => ({
					value: instrument,
					label: instrument,
				})
			)
			setInstrumentData(tickerData)
		} catch (error) {
			notification.success({ message: 'Error While login' })
		}
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
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			children: (
				<Flex flex={1} justify="center">
					<Select
						value={basketData.exchange}
						size="large"
						onChange={handleBasketExchangeChange}
						options={exchangeType}
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
					<Toggle<BasketType>
						label1="INTRADAY"
						label2="POSITIONAL"
						toogle1={BasketType.INTRADAY}
						toogle2={BasketType.POSITIONAL}
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
						Instrument
					</Typography.Text>
				</Flex>
			),
			key: 'instrument',
			span: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
			children: (
				<Flex flex={1} justify="center">
					<Select
						size="large"
						value={basketData.ticker}
						onChange={handleBasketTickerChange}
						options={instrumentData}
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
					<Toggle<BasketAtm>
						label1="Spot as ATM"
						label2="Future as ATM"
						toogle1={BasketAtm.SPOT}
						toogle2={BasketAtm.FUTURE}
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
			<Descriptions items={items} bordered column={4} />
		</Flex>
	)
}

export default Header
