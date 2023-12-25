import { Button, ConfigProvider, theme } from 'antd'
import { useToggle } from 'src/common/utils/state-utils'
import QuarterlyResultsModal from './quarterly-results-modal'

export const QuarterlyResults = () => {
	const { token } = theme.useToken()

	const [isQuarterlyResultsModalOpen, toggleIsQuarterlyResultsModalOpen] =
		useToggle()

	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Button: {
							defaultBorderColor: token.colorPrimaryHover,
						},
					},
				}}
			>
				<Button onClick={toggleIsQuarterlyResultsModalOpen}>
					Quarterly Results
				</Button>
			</ConfigProvider>
			{isQuarterlyResultsModalOpen && (
				<QuarterlyResultsModal onCancel={toggleIsQuarterlyResultsModalOpen} />
			)}
		</>
	)
}

export default QuarterlyResults
