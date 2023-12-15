import { Modal, theme, Flex } from 'antd'
import Header from './header'
import Footer from './footer'
import Toggle from './toggle'
import PositionSelector from './position-selector'
import CappedButton from './capped-button'
import { OptionObject } from '../../types/types'
import { basketOptions } from '../../constants/data'
const EditBasketModal = () => {
	const { token } = theme.useToken()

	const setToogleValue = (value: string) => {
		console.log(value)
	}
	const setOptionValue = (value: OptionObject) => {
		console.log(value)
	}
	const setProfitValue = (value: number) => {
		console.log(value)
	}

	return (
		<Modal
			className="select-none"
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
				<Toggle
					toogle1="INTRADAY"
					toogle2="POSITIONAL"
					setToogleValue={setToogleValue}
				/>
				<PositionSelector
					onOptionChange={setOptionValue}
					options={basketOptions}
				/>
				<Toggle
					toogle1="Spot as ATM"
					toogle2="Future as ATM"
					setToogleValue={setToogleValue}
				/>
			</Flex>
			<CappedButton label="Total Profit" value={1} setValue={setProfitValue} />
		</Modal>
	)
}

export default EditBasketModal
