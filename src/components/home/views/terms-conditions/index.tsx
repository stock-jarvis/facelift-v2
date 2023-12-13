import { Flex } from 'antd'
import { termsAndConditions } from '../../constants/data'
import CompanyTerms from '../../common/company-terms'
const Index = () => {
	return (
		<Flex>
			<CompanyTerms label="Terms & Conditions" {...termsAndConditions} />
		</Flex>
	)
}

export default Index
