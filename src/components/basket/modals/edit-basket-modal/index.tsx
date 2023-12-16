import { Modal, theme, Flex } from 'antd'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
import Toggle from './modal-components/toggle'
import FututeBasketDetails from './modal-containers/future-basket-details'
import OptionBasketDetail from './modal-containers/options-basket-details'
import ExitCondition from './modal-containers/exit-condition'
//import YeildButton from './modal-components/yeild-button'
import OptionsBasketSelector from './modal-containers/options-basket-selector'
import SpotBasketSelector from './modal-containers/spot-basket-selector'
import FutureBasketSelector from './modal-containers/future-basket-selector'
//import QuantityInput from './quantity-input'
import PositionSelector from './modal-containers/position-selector'
//import CappedButton from './capped-button'
//import ActionSection from '../../common/basket-item/action-section'
//import ActionSelector from './action-selector'

import { OptionObject } from '../../types/types'
import { basketOptions } from '../../constants/data'
import SpotBasketDetail from './modal-containers/spot-basket-detail'
//import ProfitLoss from './profit-loss-section'

//import Instrument from './instrument'
//import EntryExit from './entry-exit-container'
import { useState } from 'react'

const EditBasketModal = () => {
	const { token } = theme.useToken()
	const [basketOption, setBasketOption] = useState<string>('spot')
	const setToogleValue = (value: string) => {
		value
	}
	const setOptionValue = (value: OptionObject) => {
		setBasketOption(value.value)
	}
	// const setProfitValue = (value: number) => {
	// 	console.log(value)
	// }

	return (
		<Modal
			className="select-none no-scrollbar"
			title={<Header />}
			open={true}
			width={1200}
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
					height: '500px',
					padding: token.paddingXS,
					overflow: 'scroll',
				},
			}}
			closeIcon={null}
		>
			<Flex vertical gap="middle">
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
						<SpotBasketSelector />
					) : basketOption === 'future' ? (
						<FutureBasketSelector />
					) : (
						<OptionsBasketSelector />
					)}
				</Flex>
				{/* <YeildButton label={'Total Profit'} /> */}
				<SpotBasketDetail />
				<FututeBasketDetails />
				<OptionBasketDetail />
				<ExitCondition />
			</Flex>
		</Modal>
	)
}

export default EditBasketModal
