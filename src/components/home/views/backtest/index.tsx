import Backtest from 'src/assets/images/backtest.png'
import Desc from '../../container/backtest-desc'
import InvertedCard from '../../common/inverted-card'

export default function ThirdContainer() {
	return (
		<div className="pt-40 pb-40">
			<InvertedCard image={Backtest}>
				<Desc />
			</InvertedCard>
		</div>
	)
}
