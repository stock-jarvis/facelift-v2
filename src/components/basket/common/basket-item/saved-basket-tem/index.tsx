import { Flex, Typography, theme } from 'antd'
import ActionSection from '../action-section'
import { savedIconsSections } from '../../../constants/data'
interface BasketItemProps {
	name: string
	identifier: number
}
const BasketItem = ({ name, identifier }: BasketItemProps) => {
	const { token } = theme.useToken()
	const onActionClicked = (val: string) => {
		// TODO: bind it with action handlers
		console.log(name, identifier)
		console.log(val)
	}
	return (
		<Flex flex="1">
			<Flex
				flex="1"
				align="center"
				style={{
					borderTop: '0.5px solid #D3D3D3',
					borderBottom: '0.5px solid #D3D3D3',
					borderLeft: '0.5px solid #D3D3D3',
				}}
				className="hover:bg-transparent/5"
			>
				<Typography.Text
					style={{
						fontWeight: token.fontWeightStrong,
						paddingLeft: token.paddingXS,
					}}
				>
					{name} {identifier > 0 ? `- ${identifier}` : ''}
				</Typography.Text>
			</Flex>
			<ActionSection
				handleActionClicked={onActionClicked}
				actions={savedIconsSections}
			/>
		</Flex>
	)
}
export default BasketItem
