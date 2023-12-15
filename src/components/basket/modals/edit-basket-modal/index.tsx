import { Modal, Flex, Select, Button, theme } from 'antd'
//import { calc } from 'antd/es/theme/internal'
import { CloseOutlined } from '@ant-design/icons'

const EditBasketModal = () => {
	const { token } = theme.useToken()
	return (
		<Modal
			title={
				<Flex align="center" flex="1">
					<Flex flex={1} gap={'middle'} justify="center">
						<Select options={[{ id: 1, value: 1, label: '1' }]}></Select>
						<Select options={[{ id: 1, value: 1, label: '1' }]}></Select>
					</Flex>
					<Flex
						style={{
							padding: token.paddingXS,
						}}
					>
						<CloseOutlined style={{ color: '#ffffff' }} />
					</Flex>
				</Flex>
			}
			open={true}
			width={1200}
			footer={
				<Flex justify="flex-end">
					<Button type="primary">Save Basket</Button>
				</Flex>
			}
			//style={{WebkitScrollbar: { display: 'none' }}}
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
					backgroundColor: token.colorPrimary,
				},
				body: {
					scrollbarColor: '-moz-initial',
					height: '400px',
					padding: 0,
					overflow: 'scroll',
				},
			}}
			//className="p-0"
			closeIcon={null}
			okButtonProps={{ type: 'default' }}
			//onCancel={onModalClose}
			//onOk={onOkSelect}
		>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
			<div>hello</div>
		</Modal>
	)
}

export default EditBasketModal
