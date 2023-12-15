import { useBasketStore } from '../../store/basket-store'
import { theme } from 'antd'
interface TradeTypeItemProps {
	id: number
	type: string
	onClick: (data: number) => void
}

const TradeTypeItem = ({ id, type, onClick }: TradeTypeItemProps) => {
	const { exchange } = useBasketStore()
	const { token } = theme.useToken()
	return (
		<div
			className={`p-[10px] flex flex-1 cursor-pointer justify-center items-center first:border-r-[2px] last:border-l-[2px]`}
			style={{
				backgroundColor: exchange.id === id ? token.colorPrimary : '#ffff',
				color: exchange.id === id ? '#ffff' : '#000000',
			}}
			onClick={() => onClick(id)}
		>
			<p className="text-md font-semibold">{type}</p>
		</div>
	)
}

export default TradeTypeItem
