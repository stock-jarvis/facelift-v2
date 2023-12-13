import { Flex } from 'antd'
import { BiEdit, BiSave } from 'react-icons/bi'
import { HiOutlineDuplicate } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'

const ActionSection = () => {
	return (
		<Flex
			align="center"
			className="w-fit bg-primary fill-secondary text-secondary"
		>
			<Flex className="p-[10px] border-r-[1px] border-secondary hover:fill-textDark">
				<BiEdit className="fill-inherit" />
			</Flex>
			<Flex className="p-[10px] border-r-[1px] border-secondary hover:text-textDark">
				<HiOutlineDuplicate className="text-inherit" />
			</Flex>
			<Flex className="p-[10px] border-r-[1px] border-secondary hover:text-textDark">
				<BiSave />
			</Flex>
			<Flex className="p-[10px] hover:text-textDark">
				<AiOutlineDelete />
			</Flex>
		</Flex>
	)
}

export default ActionSection
