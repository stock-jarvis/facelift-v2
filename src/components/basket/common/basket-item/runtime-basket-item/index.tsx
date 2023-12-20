import { Flex, Checkbox, theme } from 'antd'
import NameSection from './name-section'
import ActionSection from '../action-section'
import { iconsSections } from '../../../constants/data'
import { useBasketStore } from 'src/components/basket/store/basket-store'
import { useState, useEffect } from 'react'
interface RuntimeBasketItemProps {
	handleOnClickAction: (id: string, actionType: string, name: string) => void
	identifier: number
	exchange: string
	name: string
	id: string
}
const BasketItem = ({
	identifier,
	exchange,
	name,
	id,
	handleOnClickAction,
}: RuntimeBasketItemProps) => {
	const { token } = theme.useToken()
	const [itemSelected, setItemSelected] = useState(false)
	const { runtimeBasketList, addToSelectedBaskets, filterSelectedBaskets } =
		useBasketStore()
	const [error, setError] = useState<boolean>(false)
	const handleActionClicked = (actionType: string) => {
		handleOnClickAction(id, actionType, name)
	}
	useEffect(() => {
		if (itemSelected) {
			addToSelectedBaskets(id)
		} else if (!itemSelected) {
			filterSelectedBaskets(id)
		}
	}, [itemSelected, addToSelectedBaskets, filterSelectedBaskets, id])

	useEffect(() => {
		const basketIndex = runtimeBasketList.findIndex(
			(basket) => basket.id === id
		)
		if (basketIndex !== -1) {
			setError(runtimeBasketList[basketIndex].error)
		}
	}, [runtimeBasketList, id])

	return (
		<Flex
			className="hover:bg-transparent/5"
			flex="1"
			style={{ border: !error ? '0.5px solid #D3D3D3' : '.5px solid red' }}
		>
			<Flex
				align="center"
				style={{
					padding: `${token.paddingXS}px`,
					borderRight: '0',
					boxSizing: 'content-box',
				}}
				className={`border-[1px] select-none}`}
			>
				<Checkbox
					checked={itemSelected}
					onChange={() => {
						setItemSelected(!itemSelected)
					}}
				/>
			</Flex>
			<NameSection exchange={exchange} name={name} identifier={identifier} />
			<ActionSection
				actions={iconsSections}
				handleActionClicked={handleActionClicked}
			/>
		</Flex>
	)
}
export default BasketItem
