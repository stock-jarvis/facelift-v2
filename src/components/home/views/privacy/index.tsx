import { Flex } from 'antd'
import { privacyPolicy } from '../../constants/data'
import CompanyTerms from '../../common/company-terms'
const Index = () => {
	return (
		<Flex>
			<CompanyTerms label="Privacy Policy" {...privacyPolicy} />
		</Flex>
	)
}

export default Index
