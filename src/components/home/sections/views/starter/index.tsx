import Simulator from 'src/assets/images/simulator.png'
import StartDisc from '../../descriptions/starterDisc'
import InfoCard from '../../custom/infoCard'

const HowItWorks = () => {
	return (
		<InfoCard image={Simulator}>
			<StartDisc />
		</InfoCard>
	)
}

export default HowItWorks
