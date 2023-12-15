import { Modal, theme } from 'antd'
import Header from './header'
import Footer from './footer'

const EditBasketModal = () => {
	const { token } = theme.useToken()
	return (
		<Modal
			className="select-none"
			title={<Header />}
			open={true}
			width={1200}
			footer={<Footer />}
			styles={{
				content: {
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
					height: '450px',
					padding: token.paddingXS,
					overflow: 'scroll',
				},
			}}
			closeIcon={null}
		>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
		</Modal>
	)
}

export default EditBasketModal
