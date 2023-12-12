import Simulator from '../../../assets/images/simulator.png'
import StartDisc from '../sections/descriptions/starterDisc'
import InfoCard from '../sections/custom/infoCard'

const HowItWorks = () => {
	return (
		<InfoCard image={Simulator}>
			<StartDisc />
		</InfoCard>
	)
}

export default HowItWorks
