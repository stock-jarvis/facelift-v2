import { Flex, Image } from 'antd'
import React from 'react'
interface Props {
	children: React.ReactNode
	image: string
}
const InvertedCard = ({ children, image }: Props) => {
	return (
		<Flex
			flex={1}
			className=" sm:p-10 max-sm:flex-col-reverse sm:items-center max-sm:justify-center"
			gap="middle"
		>
			<Flex flex={'1'} justify="center">
				<Image src={image ? image : ''} alt="Image" preview={false} />
			</Flex>
			<Flex flex={1}>{children}</Flex>
		</Flex>
	)
}

export default InvertedCard
