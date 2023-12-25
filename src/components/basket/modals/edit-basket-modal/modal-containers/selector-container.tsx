import { Tabs, TabsProps, theme, Divider, Flex, Typography } from 'antd'
import SpotBasketSelector from './spot-basket-selector'
import FutureBasketSelector from './future-basket-selector'
import OptionsBasketSelector from './options-basket-selector'
import { TradeOptions } from 'src/components/basket/types/types'
import { useState } from 'react'
import {
	futureExpiry,
	optionExpiry,
} from 'src/components/basket/constants/data'
interface SelectProps {
	basketData: object
	setBasketData: (val: { quantity: number }) => void
	quantityValue: number
	instrument: string
	actionValue: string
	optionType: string
	futureExpiryBaseValue: string
	optionExpiryBaseValue: string

	subTradeOption: string
	tradeValue: number
	tradeOption: string
	subTradeOptionList: TradeOptions[]
	setTradeValue: (val: number) => void
	setOptionType: (val: string) => void
	setTradeOption: (val: string) => void
	setActionValue: (val: string) => void
	handleAddBasket: (val: string) => void
	setOptionValue: () => void
	setQuantityValue: (val: number) => void
	setSubTradeOption: (val: string) => void
	setSubTradeOptionList: (val: TradeOptions[]) => void
	setFutureExpiryBaseValue: (val: string) => void
	setOptionExpiryBaseValue: (val: string) => void
}

const Selectors: React.FC<SelectProps> = ({
	//basketData,
	//setBasketData,
	quantityValue,
	actionValue,
	instrument,

	futureExpiryBaseValue,
	optionExpiryBaseValue,
	subTradeOption,
	optionType,
	tradeValue,
	tradeOption,
	subTradeOptionList,
	setTradeOption,
	setOptionValue,
	setOptionType,
	setTradeValue,
	setActionValue,
	handleAddBasket,
	setQuantityValue,
	setSubTradeOption,
	setSubTradeOptionList,
	setFutureExpiryBaseValue,
	setOptionExpiryBaseValue,
}) => {
	const { token } = theme.useToken()
	const [tabValue, setTabValue] = useState<string>('spot')
	const handleTabChange: TabsProps['onChange'] = (e: string) => {
		setOptionValue()
		setTabValue(e)
	}

	//const handleValueChange= (e: string) => {}
	return (
		<Flex flex={1} vertical gap="middle">
			<Divider>
				<Typography.Text
					style={{ fontSize: token.fontSizeLG, color: token.colorPrimary }}
				>
					Positions
				</Typography.Text>
			</Divider>
			<Tabs
				destroyInactiveTabPane={true}
				type="card"
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
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								baseInstrumentValue={instrument}
								handleBaseActionChange={setActionValue}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
							/>
						),
					},
					{
						label: 'Future',
						key: 'future',
						children: (
							<FutureBasketSelector
								futureExpiryBaseValue={futureExpiryBaseValue}
								futureExpiryList={futureExpiry}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								baseInstrumentValue={instrument}
								handleBaseActionChange={setActionValue}
								handleBaseExpiryChange={setFutureExpiryBaseValue}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
							/>
						),
					},
					{
						label: 'Options',
						key: 'options',
						children: (
							<OptionsBasketSelector
								optionExpiryBaseValue={optionExpiryBaseValue}
								optionExpiryList={optionExpiry}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								baseOptionValue={optionType}
								baseSubTradeOption={subTradeOption}
								baseInstrumentValue={instrument}
								baseTradeValue={tradeValue}
								baseTradeOption={tradeOption}
								baseSubTradeOptionList={subTradeOptionList}
								handleBaseExpiryChange={setOptionExpiryBaseValue}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
								handleBaseActionChange={setActionValue}
								handleBaseOptionChange={setOptionType}
								handleBaseTradeValueChange={setTradeValue}
								handleBaseTradeChange={setTradeOption}
								handleBaseSubTradeChange={setSubTradeOption}
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
