import { Flex, Typography } from 'antd'
const NameSection = () => {
	return (
		<Flex flex="1" className="bg-primary  box-content" align="center">
			<Flex flex="1" className="p-[10px] text-lg font-medium text-textLight">
				<Typography.Text className="text-inherit">NSE</Typography.Text>
				<Typography.Text className="text-inherit">(Apple)</Typography.Text>
			</Flex>
			<Flex
				flex="3"
				className="bg-white p-[10px] border-t-[1px] border-b-[1px] border-solid border-textDark"
			>
				<Typography.Text className="text-md font-bold text-textDark   ">
					Apple
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default NameSection
