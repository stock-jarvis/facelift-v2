import { theme } from 'antd'
interface TradeTypeItemProps {
	type: string
	id: number
	exchangeValue: string
	onClick: (data: number) => void
}

const TradeTypeItem = ({
	exchangeValue,
	id,
	type,
	onClick,
}: TradeTypeItemProps) => {
	const { token } = theme.useToken()
	return (
		<div
			className={`p-[10px] flex flex-1 cursor-pointer justify-center items-center first:border-r-[2px] last:border-l-[2px]`}
			style={{
				backgroundColor: type === exchangeValue ? token.colorPrimary : '#ffff',
				color: type === exchangeValue ? '#ffff' : '#000000',
			}}
			onClick={() => onClick(id)}
		>
			<p className="text-md font-semibold">{type}</p>
		</div>
	)
}

export default TradeTypeItem
