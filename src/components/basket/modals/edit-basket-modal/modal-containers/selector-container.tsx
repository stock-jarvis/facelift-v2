import { Tabs, TabsProps, theme, Divider, Flex, Typography } from 'antd'
import SpotBasketSelector from './spot-basket-selector'
import FutureBasketSelector from './future-basket-selector'
import OptionsBasketSelector from './options-basket-selector'
import { tradeTypeData } from 'src/components/basket/constants/data'
import { BasketDataValues } from 'src/components/basket/types/types'
import { useState } from 'react'

type NumberedKeys = 'quantity' | 'tradeValue'
type Keys = 'action' | 'expiry' | 'option' | 'tradeOption' | 'subTradeOption'
interface SelectProps {
	instrument: string
	basketInitialData: BasketDataValues
	setOptionValue: () => void
	handleAddBasket: (val: string) => void
	updatedBasketData: (val: BasketDataValues) => void
}

const Selectors: React.FC<SelectProps> = ({
	instrument,
	basketInitialData,
	setOptionValue,
	handleAddBasket,
	updatedBasketData,
}) => {
	const { token } = theme.useToken()
	const [tabValue, setTabValue] = useState<string>('spot')
	const handleTabChange: TabsProps['onChange'] = (e: string) => {
		setOptionValue()
		setTabValue(e)
	}
	const handleQuantityChange = (val: number, key: NumberedKeys) => {
		updatedBasketData({ ...basketInitialData, [key]: val })
	}
	const handleActionChange = (val: string, key: Keys) => {
		updatedBasketData({ ...basketInitialData, [key]: val })
	}
	const handleTradeChange = (val: string) => {
		const list = tradeTypeData.find((trade) => trade.value === val)?.children
		if (list) {
			updatedBasketData({
				...basketInitialData,
				tradeOption: val,
				subTradeOption: list[0].value,
				tradeValue: 1,
				subTradeOptionList: list,
			})
		}
	}
	return (
		<Flex flex={1} vertical gap="middle">
			<Divider>
				<Typography.Text
					style={{ fontSize: token.fontSizeLG, color: token.colorPrimary }}
				>
					Legs
				</Typography.Text>
			</Divider>
			<Tabs
				destroyInactiveTabPane={true}
				type="card"
				tabBarStyle={{ width: '400px' }}
				activeKey={tabValue}
				onChange={(e) => {
					handleTabChange(e)
				}}
				style={{
					padding: token.paddingXS,
					borderRadius: token.borderRadiusLG,
				}}
				className="w-full"
				tabBarGutter={15}
				items={[
					{
						label: 'Spot',
						key: 'spot',
						children: (
							<SpotBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								handleBaseActionChange={(val) =>
									handleActionChange(val, 'action')
								}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={(val) =>
									handleQuantityChange(val, 'quantity')
								}
							/>
						),
					},
					{
						label: 'Future',
						key: 'future',
						children: (
							<FutureBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								handleBaseActionChange={(val) =>
									handleActionChange(val, 'action')
								}
								handleBaseExpiryChange={(val) =>
									handleActionChange(val, 'expiry')
								}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={(val) =>
									handleQuantityChange(val, 'quantity')
								}
							/>
						),
					},
					{
						label: 'Options',
						key: 'options',
						children: (
							<OptionsBasketSelector
								basketInitialData={basketInitialData}
								baseInstrumentValue={instrument}
								handleBaseExpiryChange={(val) =>
									handleActionChange(val, 'expiry')
								}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={(val) =>
									handleQuantityChange(val, 'quantity')
								}
								handleBaseActionChange={(val) =>
									handleActionChange(val, 'action')
								}
								handleBaseOptionChange={(val) =>
									handleActionChange(val, 'option')
								}
								handleBaseTradeValueChange={(val) =>
									handleQuantityChange(val, 'tradeValue')
								}
								handleBaseTradeChange={(val) => {
									handleTradeChange(val)
								}}
								handleBaseSubTradeChange={(val) =>
									updatedBasketData({
										...basketInitialData,
										subTradeOption: val,
									})
								}
							/>
						),
					},
				]}
			/>
		</Flex>
	)
}
export default Selectors
