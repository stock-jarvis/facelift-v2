import { Flex, Image } from 'antd'
import React from 'react'
import Card from './card'
//import Simulator from '../../../assets/images/simulator.png'
//import SimulatorDisc from './descriptions/simulatorDisc'
interface Props {
	children: React.ReactNode
	image: string
}
const HowItWorks = ({ children, image }: Props) => {
	return (
		<Card>
			{children}
			<Flex flex={'1'} justify="center">
				<Image src={image ? image : ''} alt="Image" preview={false} />
			</Flex>
		</Card>
	)
}

export default HowItWorks
