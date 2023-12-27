import { Tabs, TabsProps, theme, Divider, Flex, Typography } from 'antd'
import SpotBasketSelector from './spot-basket-selector'
import FutureBasketSelector from './future-basket-selector'
import OptionsBasketSelector from './options-basket-selector'
import {
	TradeOptions,
	BasketDataValues,
} from 'src/components/basket/types/types'
import { useState } from 'react'
import {
	futureExpiry,
	optionExpiry,
} from 'src/components/basket/constants/data'
type NumberedKeys = 'quantity' | 'tradeValue'
type Keys = 'action' | 'expiry' | 'option' | 'tradeOption' | 'subTradeOption'
interface SelectProps {
	basketInitialData: BasketDataValues
	updatedBasketData: (val: BasketDataValues) => void
	instrument: string
	subTradeOptionList: TradeOptions[]
	handleAddBasket: (val: string) => void
	setOptionValue: () => void
	setSubTradeOptionList: (val: TradeOptions[]) => void
}

const Selectors: React.FC<SelectProps> = ({
	instrument,
	basketInitialData,
	subTradeOptionList,
	updatedBasketData,
	setOptionValue,
	handleAddBasket,
	setSubTradeOptionList,
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
								baseQuantityValue={basketInitialData.quantity}
								baseActionValue={basketInitialData.action}
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
								futureExpiryBaseValue={basketInitialData.expiry || ''}
								futureExpiryList={futureExpiry}
								baseQuantityValue={basketInitialData.quantity}
								baseActionValue={basketInitialData.action}
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
								optionExpiryBaseValue={basketInitialData.expiry || ''}
								optionExpiryList={optionExpiry}
								baseQuantityValue={basketInitialData.quantity}
								baseActionValue={basketInitialData.action}
								baseOptionValue={basketInitialData.option || ''}
								baseSubTradeOption={basketInitialData.subTradeOption || ''}
								baseInstrumentValue={instrument}
								baseTradeValue={basketInitialData.tradeValue || 1}
								baseTradeOption={basketInitialData.tradeOption}
								baseSubTradeOptionList={subTradeOptionList}
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
									handleActionChange(val, 'tradeOption')
								}}
								handleBaseSubTradeChange={(val) =>
									updatedBasketData({ ...basketInitialData, tradeOption: val })
								}
								handleBaseSubTradeListChange={setSubTradeOptionList}
							/>
						),
					},
				]}
			/>
		</Flex>
	)
}
export default Selectors
