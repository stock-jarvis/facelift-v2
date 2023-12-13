import { Flex, Typography } from 'antd'
import React from 'react'
const { Text } = Typography
interface Props {
	data: Array<{ name: string; id: string; icon: React.ReactNode }>
}
interface ListItemProps {
	icon: React.ReactNode
	name: string
}

const ListItem = ({ icon, name }: ListItemProps) => {
	return (
		<Flex gap="middle" className="sm:items-center max-sm:justify-start">
			<div className="text-white">{icon}</div>
			<Text
				strong
				className="text-white cursor-pointer select-none hover:underline"
			>
				{name}
			</Text>
		</Flex>
	)
}
const List = ({ data }: Props) => {
	return (
		<Flex vertical gap="middle">
			{data.map((val) => (
				<ListItem {...val} key={val.id} />
			))}
		</Flex>
	)
}

export default List
