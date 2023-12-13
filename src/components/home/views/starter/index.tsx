import Simulator from 'src/assets/images/simulator.png'
import StartDisc from '../../container/starter-disc'
import InfoCard from '../../common/info-card'
const HowItWorks = () => {
	return (
		<div className="pt-40 pb-40">
			<InfoCard image={Simulator}>
				<StartDisc />
			</InfoCard>
		</div>
	)
}

export default HowItWorks
