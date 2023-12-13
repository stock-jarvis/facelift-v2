interface TradeTypeItemProps {
	id: number
	name: string
	selected: boolean
	onClick: (data: number) => void
}

const TradeTypeItem = ({ id, name, selected, onClick }: TradeTypeItemProps) => {
	return (
		<div
			className={`p-[10px] flex flex-1 cursor-pointer justify-center items-center first:border-r-[2px] last:border-l-[2px] ${
				selected ? 'bg-primary text-textLight' : 'bg-secondary text-textDark '
			}`}
			onClick={() => onClick(id)}
		>
			<p className="text-lg font-semibold">{name}</p>
		</div>
	)
}

export default TradeTypeItem
