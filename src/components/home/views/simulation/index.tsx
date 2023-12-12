import Simulator from 'src/assets/images/simulator.png'
import SimulatorDisc from '../../container/simulator-disc'
import InfoCard from '../../common/info-card'
const HowItWorks = () => {
	return (
		<div className="pt-40 pb-40">
			<InfoCard image={Simulator}>
				<SimulatorDisc />
			</InfoCard>
		</div>
	)
}

export default HowItWorks
