import { Flex } from 'antd'
import CappedButton from '../modal-components/capped-button'

interface ProfitLossProps {
	setProfitValue: (value: number) => void
	setLossValue: (value: number) => void
	profitLabel: string
	lossLabel: string
	profitValue: number
	lossValue: number
}

const ProfitLoss = ({
	setProfitValue,
	setLossValue,
	profitLabel,
	lossLabel,
	profitValue,
	lossValue,
}: ProfitLossProps) => {
	return (
		<Flex
			flex="1"
			style={{ cursor: 'pointer' }}
			justify="center"
			align="center"
			vertical
		>
			<CappedButton
				label={profitLabel}
				value={profitValue}
				setValue={setProfitValue}
			/>
			<CappedButton
				label={lossLabel}
				value={lossValue}
				setValue={setLossValue}
			/>
		</Flex>
	)
}

export default ProfitLoss
