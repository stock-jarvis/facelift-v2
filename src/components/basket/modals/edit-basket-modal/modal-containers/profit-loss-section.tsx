import { Flex } from 'antd'
import CappedButton from '../modal-components/capped-button'
import { SavedBasketsObject } from 'src/components/basket/types/types'
interface ProfitLossProps {
	basketData: SavedBasketsObject
	setBasketData: (val: SavedBasketsObject) => void
	profitLabel: string
	lossLabel: string
}

const ProfitLoss: React.FC<ProfitLossProps> = ({
	basketData,
	profitLabel,
	lossLabel,
	setBasketData,
}) => {
	const handleChangeProfit = (val: number) => {
		setBasketData({
			...basketData,
			exitCondition: { ...basketData.exitCondition, totalProfit: val },
		})
	}
	const handleChangeLoss = (val: number) => {
		setBasketData({
			...basketData,
			exitCondition: { ...basketData.exitCondition, totalLoss: val },
		})
	}
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
				value={basketData.exitCondition.totalProfit}
				setValue={handleChangeProfit}
			/>
			<CappedButton
				label={lossLabel}
				value={basketData.exitCondition.totalLoss}
				setValue={handleChangeLoss}
			/>
		</Flex>
	)
}

export default ProfitLoss
