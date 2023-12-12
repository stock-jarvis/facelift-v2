import Simulator from '../../../assets/images/simulator.png'
import SimulatorDisc from './descriptions/simulatorDisc'
import InfoCard from '../sections/custom/infoCard'
const HowItWorks = () => {
	return (
		<InfoCard image={Simulator}>
			<SimulatorDisc />
		</InfoCard>
	)
}

export default HowItWorks
