import { Flex, theme, Tooltip, Button, Image } from 'antd'
import StockJarvis from 'src/assets/images/stock-jarvis.png'
import { PlusOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
const EmptyBasket = () => {
	const { toggleSetBasketModalOpen } = useBasketStore()
	const { token } = theme.useToken()

	const handleCreateClick = () => {
		toggleSetBasketModalOpen(true)
	}

	return (
		<Flex vertical gap={'middle'} justify="center" align="center">
			<Image src={StockJarvis} alt="Image" preview={false} />
			<Tooltip title="Create New Basket">
				<Button
					size="large"
					icon={<PlusOutlined />}
					style={{
						background: token.colorPrimary,
						color: token.colorTextLightSolid,
					}}
					onClick={handleCreateClick}
				>
					Add New Basket
				</Button>
			</Tooltip>
		</Flex>
	)
}

export default EmptyBasket
