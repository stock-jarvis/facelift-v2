import Simulator from 'src/assets/images/simulator.png'
import SimulatorDisc from '../../descriptions/simulatorDisc'
import InfoCard from '../../custom/infoCard'
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
