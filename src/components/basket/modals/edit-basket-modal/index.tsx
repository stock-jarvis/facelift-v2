import { Modal, theme } from 'antd'
import Header from './header'
import Footer from './footer'
import Toggle from './toggle'
import PositionSelector from './position-selector'
const EditBasketModal = () => {
	const { token } = theme.useToken()

	const setToogleValue = (value: string) => {
		console.log(value)
	}
	return (
		<Modal
			className="select-none"
			title={<Header />}
			open={true}
			width={1250}
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
			<Toggle
				toogle1="INTRADAY"
				toogle2="POSITIONAL"
				setToogleValue={setToogleValue}
			/>
			<PositionSelector />
		</Modal>
	)
}

export default EditBasketModal
