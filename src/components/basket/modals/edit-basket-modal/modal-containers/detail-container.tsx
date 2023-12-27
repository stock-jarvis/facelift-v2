import {
	BasketDataProps,
	OptionObject,
	TradeOptions,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
	futureExpiry,
	optionExpiry,
	tradeTypeData,
} from 'src/components/basket/constants/data'
import SpotBasketDetail from './spot-basket-detail'
import FututeBasketDetails from './future-basket-details'
import OptionBasketDetail from './options-basket-details'
interface DetailsContainerProps {
	basket: BasketDataProps[]
	instrument: string
	tradeOption: string
	subTradeOption: string
	subTradeOptionList: TradeOptions[]
	setBasket: (basket: BasketDataProps[]) => void
	handleCopyBasket: (id: string) => void
	handleDeleteBasket: (id: string) => void
}
import { useState } from 'react'
const DetailsContainer: React.FC<DetailsContainerProps> = ({
	basket,
	instrument,
	tradeOption,
	subTradeOption,
	subTradeOptionList,
	setBasket,
	handleCopyBasket,
	handleDeleteBasket,
}) => {
	const [futureExpiryList] = useState<OptionObject[]>(futureExpiry)
	const [optionExpiryList] = useState<OptionObject[]>(optionExpiry)
	return (
		<>
			{basket.length > 0 &&
				basket.map((bask, index) =>
					bask.type === 'spot' ? (
						<SpotBasketDetail
							dark={index % 2 === 0}
							key={bask.id}
							id={bask.id}
							count={bask.count}
							basket={basket}
							baseTotalProfitValue={bask.exitCondition?.totalProfit.value || 0}
							baseSpotLossOption={
								bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
							}
							baseTotalProfitOption={
								bask.exitCondition?.totalProfit.type ||
								totalProfitOptions[0].value
							}
							baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
							baseQuanity={bask.entryCondition.quantity}
							baseInstrumentValue={instrument}
							baseActionValue={bask.entryCondition.actionType}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					) : bask.type === 'future' ? (
						<FututeBasketDetails
							key={bask.id}
							id={bask.id}
							dark={index % 2 === 0}
							count={bask.count}
							baseQuanity={bask.entryCondition.quantity}
							baseInstrumentValue={instrument}
							baseTotalProfitValue={bask.exitCondition?.totalProfit.value || 0}
							baseSpotLossOption={
								bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
							}
							baseTotalProfitOption={
								bask.exitCondition?.totalProfit.type ||
								totalProfitOptions[0].value
							}
							baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
							baseActionValue={bask.entryCondition.actionType}
							futureExpiryBaseValue={bask.entryCondition.expiry || 'Monthly'}
							futureExpiryList={futureExpiryList}
							basket={basket}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					) : (
						<OptionBasketDetail
							key={bask.id}
							id={bask.id}
							dark={index % 2 === 0}
							count={bask.count}
							baseQuanity={bask.entryCondition.quantity}
							optionExpiryBaseValue={bask.entryCondition.expiry || 'Monthly'}
							baseTotalProfitValue={bask.exitCondition?.totalProfit.value || 0}
							baseSpotLossOption={
								bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
							}
							baseTotalProfitOption={
								bask.exitCondition?.totalProfit.type ||
								totalProfitOptions[0].value
							}
							baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
							baseActionValue={bask.entryCondition.actionType}
							baseOptionValue={bask.entryCondition.optionType || 'CE'}
							baseInstrumentValue={instrument}
							optionExpiryList={optionExpiryList}
							baseSubTradeOption={
								bask.entryCondition.tradeTypeParams || subTradeOption
							}
							baseTradeOption={bask.entryCondition.tradeType || tradeOption}
							baseSubTradeOptionList={
								tradeTypeData.find(
									(trade) => trade.value === bask.entryCondition.tradeType
								)?.children || subTradeOptionList
							}
							baseTradeValue={bask.entryCondition.tradeTypeValue || 0}
							basket={basket}
							handleEditBasket={setBasket}
							handleCopyBasket={handleCopyBasket}
							handleDeleteBasket={handleDeleteBasket}
						/>
					)
				)}
		</>
	)
}

export default DetailsContainer
