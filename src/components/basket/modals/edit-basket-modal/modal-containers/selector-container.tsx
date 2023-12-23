import { Tabs, TabsProps } from 'antd'
import SpotBasketSelector from './spot-basket-selector'
import FutureBasketSelector from './future-basket-selector'
import OptionsBasketSelector from './options-basket-selector'
import { OptionObject, TradeOptions } from 'src/components/basket/types/types'
interface SelectProps {
	quantityValue: number
	instrument: string
	actionValue: string
	optionType: string
	futureExpiryBaseValue: string
	optionExpiryBaseValue: string
	futureExpiryList: OptionObject[]
	optionExpiryList: OptionObject[]
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
	quantityValue,
	actionValue,
	instrument,
	optionExpiryList,
	futureExpiryList,
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
	const handleTabChange: TabsProps['onChange'] = () => {
		setOptionValue()
	}
	return (
		<Tabs
			type="card"
			onChange={(e) => {
				handleTabChange(e)
			}}
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
							futureExpiryList={futureExpiryList}
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
							optionExpiryList={optionExpiryList}
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
	)
}
export default Selectors
