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

const Index: React.FC<ModalProps> = ({
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
							fontSize: token.fontSize,
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
					<Button onClick={handleOkSelect} type="primary">
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
			<Flex flex="1" justify="center" align="center">
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
						textAlign: 'center',
					}}
				>
					{message}
				</Typography.Text>
			</Flex>
		</Modal>
	)
}

export default Index
