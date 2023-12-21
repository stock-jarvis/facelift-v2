import { Flex, Typography, theme } from 'antd'
import ActionSection from '../action-section'
import { savedIconsSections } from '../../../constants/data'
interface BasketItemProps {
	id: string
	name: string
	identifier: number
	handleOnClick: (val: string, id: string) => void
}
const BasketItem: React.FC<BasketItemProps> = ({
	id,
	name,
	identifier,
	handleOnClick,
}) => {
	const { token } = theme.useToken()
	const onActionClicked = (val: string) => {
		// TODO: bind it with action handlers

		handleOnClick(val, id)
	}
	return (
		<Flex flex="1" className="hover:bg-transparent/5">
			<Flex
				flex="1"
				align="center"
				style={
					{
						//borderTop: '0.5px solid #D3D3D3',
						//borderBottom: '0.5px solid #D3D3D3',
						//borderLeft: '0.5px solid #D3D3D3',
					}
				}
			>
				<Typography.Text
					className="select-none"
					style={{
						paddingLeft: '5px',
						color: 'black',
						fontSize: token.fontSizeSM,
						fontWeight: token.fontWeightStrong,
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
