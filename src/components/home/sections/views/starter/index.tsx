import Simulator from 'src/assets/images/simulator.png'
import StartDisc from '../../descriptions/starterDisc'
import InfoCard from '../../custom/infoCard'
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
