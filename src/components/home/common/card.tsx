import { Flex } from 'antd'
import React from 'react'
interface Props {
	children: React.ReactNode
}
const Card = ({ children }: Props) => {
	return (
		<Flex
			flex={1}
			align="center"
			className="shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl p-10"
		>
			{children}
		</Flex>
	)
}

export default Card
