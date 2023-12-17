import { useState } from 'react'
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

import { generateUniqueId } from '../../common/randomizer'

import { OptionObject } from '../../types/types'
import { basketOptions } from '../../constants/data'

interface BasketDataProps {
	type: string
	id: string
}

const EditBasketModal = () => {
	const { token } = theme.useToken()
	const [basket, setBasket] = useState<BasketDataProps[]>([])
	const [basketOption, setBasketOption] = useState<string>('spot')

	//Initial values for positions
	const [quantityValue, setQuantityValue] = useState<number>(1)
	const [actionValue, setActionValue] = useState<string>('B')
	const [optionType, setOptionType] = useState<string>('CE')

	const setToogleValue = (value: string) => {
		value
	}
	const setOptionValue = (value: OptionObject) => {
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setBasketOption(value.value)
	}

	const handleAddBasket = (value: string) => {
		setBasket((prev) => [...prev, { type: value, id: generateUniqueId() }])
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

	return (
		<Modal
			className="select-none no-scrollbar"
			open={true}
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
							onOptionChange={setOptionValue}
							options={basketOptions}
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
								handleBaseQuantityChange={setQuantityValue}
								baseQuantityValue={quantityValue}
								handleAddBasket={handleAddBasket}
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
							/>
						) : basketOption === 'future' ? (
							<FutureBasketSelector
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
							/>
						) : (
							<OptionsBasketSelector
								handleAddBasket={handleAddBasket}
								handleBaseQuantityChange={setQuantityValue}
								baseQuantityValue={quantityValue}
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
								baseOptionValue={optionType}
								handleBaseOptionChange={setOptionType}
							/>
						)}
					</Flex>

					{basket?.map((bask) =>
						bask.type === 'spot' ? (
							<SpotBasketDetail
								key={bask.id}
								id={bask.id}
								baseQuanity={quantityValue}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
								baseActionValue={actionValue}
							/>
						) : bask.type === 'future' ? (
							<FututeBasketDetails
								key={bask.id}
								id={bask.id}
								baseQuanity={quantityValue}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
								baseActionValue={actionValue}
							/>
						) : (
							<OptionBasketDetail
								key={bask.id}
								id={bask.id}
								baseQuanity={quantityValue}
								handleDeleteBasket={handleDeleteBasket}
								handleCopyBasket={handleCopyBasket}
								baseActionValue={actionValue}
								baseOptionValue={optionType}
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
