import { Flex, Typography } from 'antd'
import { companyData, companyTerms, socialMedia } from '../../constants/data'
import List from '../../common/list'

const Index = () => {
	//const navigate = useNavigate();
	return (
		<Flex flex={1} vertical className="sm:p-10 bg-black" gap="middle">
			<Flex
				flex={1}
				className="sm:p-20 sm:justify-between max-sm:flex-col max-sm:gap-10 max-sm:justify-center"
			>
				<Flex flex={1} justify="center" align="center">
					<Typography.Text className="text-3xl text-white">
						StockJarvis
					</Typography.Text>
				</Flex>
				<Flex flex={1} className="justify-center ">
					<List data={companyData} />
				</Flex>
				<Flex flex={1} className="justify-center">
					<List data={socialMedia} />
				</Flex>
				<Flex flex={1} className="justify-center">
					<List data={companyTerms} />
				</Flex>
			</Flex>
			<Flex flex={1} justify="center">
				<Typography.Text className="text-[1rem] text-white">
					2023 @ StockJarvis All rights reserved.
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default Index
