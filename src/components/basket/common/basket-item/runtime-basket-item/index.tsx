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
	const { runtimeBasketList } = useBasketStore()
	const [error, setError] = useState<boolean>(false)
	const handleActionClicked = (actionType: string) => {
		handleOnClickAction(id, actionType, name)
	}

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
			flex="1"
			className={`border-[1px] select-none ${error ? 'border-[red]' : ''}`}
		>
			<Flex
				align="center"
				style={{
					padding: token.paddingXS,
					borderRight: '0',
					boxSizing: 'content-box',
				}}
				className={`border-[1px] select-none}`}
			>
				<Checkbox />
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
