import { Flex } from 'antd'
interface TermProps {
	label: string
	description: string
	terms: Array<{ key: string; head: string; desc: string }>
}
const CompanyTerms = ({ label, description, terms }: TermProps) => {
	return (
		<div className="w-full">
			<Flex
				flex={1}
				className="bg-[#043949] justify-center items-center h-[350px]"
			>
				<div className="p-[40px]">
					<p className="text-4xl font-semibold text-white">{label}</p>
				</div>
			</Flex>
			<Flex flex="1" className="justify-center mt-10">
				<Flex className="w-[90%] p-[20px] flex-col gap-10">
					<p className="text-lg font-medium">{description}</p>
					<Flex className="flex-col gap-8">
						{terms.map((term) => (
							<Flex className="flex-col gap-2" key={term.key}>
								<p className="text-lg font-bold">{term.head}</p>
								<p className="text-lg font-medium">{term.desc}</p>
							</Flex>
						))}
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
}

export default CompanyTerms
