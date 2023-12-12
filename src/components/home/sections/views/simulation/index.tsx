import Simulator from 'src/assets/images/simulator.png'
import SimulatorDisc from '../../descriptions/simulatorDisc'
import InfoCard from '../../custom/infoCard'
const HowItWorks = () => {
	return (
		<InfoCard image={Simulator}>
			<SimulatorDisc />
		</InfoCard>
	)
}

export default HowItWorks
