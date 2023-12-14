import { useBasketStore } from '../../store/basket-store'

interface TradeTypeItemProps {
	id: number
	type: string
	onClick: (data: number) => void
}

const TradeTypeItem = ({ id, type, onClick }: TradeTypeItemProps) => {
	const { exchange } = useBasketStore()

	return (
		<div
			className={`p-[10px] flex flex-1 cursor-pointer justify-center items-center first:border-r-[2px] last:border-l-[2px] ${
				exchange.id === id
					? 'bg-primary text-textLight'
					: 'bg-secondary text-textDark '
			}`}
			onClick={() => onClick(id)}
		>
			<p className="text-lg font-semibold">{type}</p>
		</div>
	)
}

export default TradeTypeItem
