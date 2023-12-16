import { Flex, theme } from 'antd'
import CappedButton from '../modal-components/capped-button'

interface ProfitLossProps {
	profitLabel: string
	lossLabel: string
	profitValue: number
	lossValue: number
	setProfitValue: (value: number) => void
	setLossValue: (value: number) => void
}

const ProfitLoss = ({
	profitLabel,
	lossLabel,
	profitValue,
	lossValue,
	setProfitValue,
	setLossValue,
}: ProfitLossProps) => {
	const { token } = theme.useToken()
	return (
		<Flex
			flex="1"
			style={{ padding: token.paddingMD, cursor: 'pointer' }}
			justify="center"
			align="center"
			gap="middle"
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
