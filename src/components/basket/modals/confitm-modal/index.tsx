import { Button, Modal, theme } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Typography, Flex } from 'antd'
interface ModalProps {
	open: boolean
	handleOpen: (val: boolean) => void
	handleCancel: (val: boolean) => void
	message: string
	header: string
}

const Index = ({
	open,
	handleOpen,
	handleCancel,
	message,
	header,
}: ModalProps) => {
	const { token } = theme.useToken()
	const handleOkSelect = () => {
		handleOpen(false)
	}
	const handleCancelSelect = () => {
		handleCancel(false)
	}
	return (
		<Modal
			title={
				<Flex
					flex="1"
					justify="space-between"
					style={{
						padding: token.paddingXS,
					}}
				>
					<Typography.Text
						style={{
							color: token.colorBgBase,
							fontWeight: token.fontWeightStrong,
							fontSize: token.fontSizeLG,
						}}
					>
						{header}
					</Typography.Text>
					<CloseOutlined
						onClick={handleCancelSelect}
						style={{ color: token.colorBgBase, paddingInline: token.paddingSM }}
					/>
				</Flex>
			}
			footer={
				<Flex style={{ padding: token.paddingSM }} justify="flex-end">
					<Button
						onClick={handleOkSelect}
						style={{
							backgroundColor: token.colorPrimary,
							color: token.colorBgBase,
						}}
					>
						Ok
					</Button>
				</Flex>
			}
			open={open}
			okButtonProps={{ type: 'default' }}
			closeIcon={null}
			destroyOnClose
			onOk={handleOkSelect}
			styles={{
				content: { marginTop: '80px', padding: 0 },
				header: { backgroundColor: token.colorPrimary },
				body: { padding: token.paddingSM },
			}}
		>
			<Typography.Text>{message}</Typography.Text>
		</Modal>
	)
}

export default Index
