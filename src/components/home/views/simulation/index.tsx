import Simulator from 'src/assets/images/simulator.png'
import SimulatorDisc from '../../container/simulatorDisc'
import InfoCard from '../../comon/infoCard'
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
