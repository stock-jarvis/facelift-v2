import Backtest from 'src/assets/images/backtest.png'
import Desc from '../../container/backTestDesc'
import InvertedCard from '../../comon/invertedCard'

export default function ThirdContainer() {
	return (
		<div className="pt-40 pb-40">
			<InvertedCard image={Backtest}>
				<Desc />
			</InvertedCard>
		</div>
	)
}
