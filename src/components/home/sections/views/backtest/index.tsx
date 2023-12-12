import Backtest from 'src/assets/images/backtest.png'
import Desc from '../../descriptions/backTestDesc'
import InvertedCard from '../../custom/invertedCard'

export default function ThirdContainer() {
	return (
		<div className="pt-40 pb-40">
			<InvertedCard image={Backtest}>
				<Desc />
			</InvertedCard>
		</div>
	)
}
