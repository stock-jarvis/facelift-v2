import { useState, useEffect } from 'react'
import { Modal, theme, Flex } from 'antd'

import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
import Toggle from './modal-components/toggle'
import FututeBasketDetails from './modal-containers/future-basket-details'
import OptionBasketDetail from './modal-containers/options-basket-details'
import SpotBasketDetail from './modal-containers/spot-basket-detail'
import ExitCondition from './modal-containers/exit-condition'
import OptionsBasketSelector from './modal-containers/options-basket-selector'
import SpotBasketSelector from './modal-containers/spot-basket-selector'
import FutureBasketSelector from './modal-containers/future-basket-selector'
import PositionSelector from './modal-containers/position-selector'
import { generateUniqueId } from '../../common/utils/randomizer'

import {
	futureExpiry,
	optionExpiry,
	tradeTypeData,
	totalProfitOptions,
	spotLossOptions,
} from '../../constants/data'
import {
	OptionObject,
	TradeOptions,
	BasketDataProps,
	//OptionsBasket,
} from '../../types/types'
import { basketOptions } from '../../constants/data'

const initialSubTrade = tradeTypeData[0].children[0].value
const initialSubTradeList = tradeTypeData[0].children
const initialTrade = tradeTypeData[0].value

const defaultSpotPosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	type: 'spot',
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
}
const defaultFuturePosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	type: 'future',
	expiry: 'Monthly',
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
}

const defaultOptionsPosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
	option_type: 'CE',
	type: 'options',
	expiry: 'Monthly',
	trade_type: tradeTypeData[0].value,
	trade_type_params: tradeTypeData[0].children[0].value,
	trade_type_value: 1,
}

const EditBasketModal = () => {
	const { token } = theme.useToken()
	const [basket, setBasket] = useState<Array<BasketDataProps>>([])
	const [basketOption, setBasketOption] = useState<string>('spot')

	const [quantityValue, setQuantityValue] = useState<number>(1)
	const [actionValue, setActionValue] = useState<string>('B')
	const [optionType, setOptionType] = useState<string>('CE')
	const [futureExpiryList] = useState<OptionObject[]>(futureExpiry)
	const [optionExpiryList] = useState<OptionObject[]>(optionExpiry)
	const [tradeOption, setTradeOption] = useState<string>(initialTrade)
	const [tradeValue, setTradeValue] = useState<number>(1)
	const [subTradeOption, setSubTradeOption] = useState<string>(initialSubTrade)
	const [subTradeOptionList, setSubTradeOptionList] =
		useState<TradeOptions[]>(initialSubTradeList)
	const [futureExpiryBaseValue, setFutureExpiryBaseValue] =
		useState<string>('Monthly')
	const [optionExpiryBaseValue, setOptionExpiryBaseValue] =
		useState<string>('Monthly')

	const setToogleValue = (value: string) => {
		value
	}
	const setOptionValue = (value: OptionObject) => {
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setOptionExpiryBaseValue('Monthly')
		setFutureExpiryBaseValue('Monthly')
		setBasketOption(value.value)
		setTradeValue(1)
		setTradeOption(tradeTypeData[0].value)
		setSubTradeOption(tradeTypeData[0].children[0].value)
		setSubTradeOptionList(tradeTypeData[0].children)
	}

	const handleAddBasket = (value: string) => {
		setBasket((prev) => [
			...prev,
			value === 'spot'
				? defaultSpotPosition
				: value === 'future'
					? defaultFuturePosition
					: defaultOptionsPosition,
		])
	}

	const handleDeleteBasket = (id: string) => {
		setBasket(basket.filter((basket) => basket.id !== id))
	}

	const handleCopyBasket = (id: string) => {
		const basketToBeCopied = basket.find((basket) => basket.id === id)
		if (basketToBeCopied) {
			setBasket((prev) => [
				...prev,
				{ ...basketToBeCopied, id: generateUniqueId() },
			])
		}
	}

	useEffect(() => {
		//console.log(basket)
	}, [basket])
	return (
		<Modal
			className="select-none no-scrollbar"
			open={false}
			width={1200}
			title={<Header />}
			footer={<Footer />}
			styles={{
				content: {
					margin: -60,
					padding: 0,
				},
				header: {
					backgroundColor: token.colorPrimary,
					padding: token.paddingXS,
				},
				footer: {
					padding: token.paddingXS,
				},
				body: {
					overflow: 'scroll',
					scrollBehavior: 'smooth',
				},
			}}
			closeIcon={null}
		>
			<Flex vertical gap="middle">
				<Flex
					vertical
					gap={'middle'}
					style={{
						padding: token.paddingMD,
						height: '500px',
						overflow: 'scroll',
						scrollBehavior: 'smooth',
					}}
					className="no-scrollbar"
				>
					<Flex
						vertical
						justify="space-between"
						align="center"
						flex={1}
						className="p-[10px] gap-10 pt-10 pb-10"
						style={{
							backgroundColor: '#F1F8FF',
							borderRadius: token.borderRadiusLG,
						}}
					>
						<div className="w-[50%]">
							<Toggle
								toogle1="INTRADAY"
								toogle2="POSITIONAL"
								setToogleValue={setToogleValue}
							/>
						</div>
						<PositionSelector
							options={basketOptions}
							onOptionChange={setOptionValue}
						/>
						<div className="w-[50%]">
							<Toggle
								toogle1="Spot as ATM"
								toogle2="Future as ATM"
								setToogleValue={setToogleValue}
							/>
						</div>
					</Flex>
					<Flex className="w-[95%] self-center">
						{basketOption === 'spot' ? (
							<SpotBasketSelector
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
							/>
						) : basketOption === 'future' ? (
							<FutureBasketSelector
								futureExpiryBaseValue={futureExpiryBaseValue}
								futureExpiryList={futureExpiryList}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
								handleBaseExpiryChange={setFutureExpiryBaseValue}
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
							/>
						) : (
							<OptionsBasketSelector
								optionExpiryBaseValue={optionExpiryBaseValue}
								optionExpiryList={optionExpiryList}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								baseOptionValue={optionType}
								baseSubTradeOption={subTradeOption}
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
						)}
					</Flex>

					{basket?.map((bask) =>
						bask.type === 'spot' ? (
							<SpotBasketDetail
								key={bask.id}
								id={bask.id}
								basket={basket}
								handleEditBasket={setBasket}
								baseQuanity={quantityValue}
								baseActionValue={actionValue}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
							/>
						) : bask.type === 'future' ? (
							<FututeBasketDetails
								key={bask.id}
								id={bask.id}
								baseQuanity={quantityValue}
								baseActionValue={actionValue}
								futureExpiryBaseValue={futureExpiryBaseValue}
								futureExpiryList={futureExpiryList}
								basket={basket}
								handleEditBasket={setBasket}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
							/>
						) : (
							<OptionBasketDetail
								key={bask.id}
								id={bask.id}
								baseQuanity={quantityValue}
								optionExpiryBaseValue={optionExpiryBaseValue}
								baseActionValue={actionValue}
								baseOptionValue={optionType}
								optionExpiryList={optionExpiryList}
								baseSubTradeOption={subTradeOption}
								baseTradeOption={tradeOption}
								baseSubTradeOptionList={subTradeOptionList}
								baseTradeValue={tradeValue}
								basket={basket}
								handleEditBasket={setBasket}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
							/>
						)
					)}
					{basket.length > 0 && <ExitCondition />}
				</Flex>
			</Flex>
		</Modal>
	)
}

export default EditBasketModal
