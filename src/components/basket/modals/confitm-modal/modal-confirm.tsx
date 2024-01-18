import { Button, Modal, theme } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Typography, Flex } from 'antd'
export interface ConfirmModalProps {
	open: boolean
	handleOpen: (val: boolean) => void
	handleCancel: (val: boolean) => void
	message: string
	header: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	open,
	handleOpen,
	handleCancel,
	message,
	header,
}) => {
	const { token } = theme.useToken()
	const handleOkSelect = () => {
		handleOpen(false)
	}
	const handleCancelSelect = () => {
		handleCancel(false)
	}

	return (
		<Modal
			open={open}
			closeIcon={null}
			onOk={handleOkSelect}
			destroyOnClose={true}
			okButtonProps={{ type: 'default' }}
			styles={{
				content: { marginTop: '80px', padding: 0 },
				body: { padding: token.paddingSM },
			}}
			title={
				<Flex
					flex="1"
					justify="space-between"
					style={{
						padding: token.paddingXS,
					}}
				>
					<Typography.Text>{header}</Typography.Text>

					<CloseOutlined
						onClick={handleCancelSelect}
						style={{ paddingInline: token.paddingSM }}
					/>
				</Flex>
			}
			footer={
				<Flex style={{ padding: token.paddingSM }} justify="flex-end">
					<Button onClick={handleOkSelect} type="primary">
						Ok
					</Button>
				</Flex>
			}
		>
			<Flex flex="1" justify="center" align="center">
				<Typography.Text children={message} />
			</Flex>
		</Modal>
	)
}

export default ConfirmModal
