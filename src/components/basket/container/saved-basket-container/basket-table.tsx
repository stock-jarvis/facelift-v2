import { Flex, Typography, TableProps } from 'antd'
import { SavedBasket, EditType } from '../../types/types'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { checkDuplicate } from '../../utils/duplicate-check'
import Actions from '../common/click-actions'
import EmptyIndicator from '../common/empty-indicator'
import { Table } from 'antd'
import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons'

const SavedBaskets = () => {
	const {
		exchange,
		savedBasket,
		setEditableBasket,
		deleteStoredBasket,
		createDuplicateStoredBasket,
		moveStoredToRuntimeBasket,
	} = useBasketStore()

	const handleBaskeMove = (id: string) => {
		moveStoredToRuntimeBasket(id)
	}
	const handleBaskeDelete = (id: string) => {
		deleteStoredBasket(id)
	}
	const handleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.SAVED)
	}
	const handleBasketDuplicate = (id: string) => {
		const basket = savedBasket.find((basket) => basket.id === id)!
		const isDuplicate = checkDuplicate(savedBasket, id, basket.name!)
		createDuplicateStoredBasket(isDuplicate!)
	}

	const columns: TableProps<SavedBasket>['columns'] = [
		{
			key: generateUniqueId(),
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record) => (
				<Flex flex="1" justify="flex-start">
					<Typography.Text>
						{record.name}
						{record.identifier > 0 ? ` - ${record.identifier}` : ''}
					</Typography.Text>
				</Flex>
			),
		},
		{
			key: generateUniqueId(),
			title: (
				<Flex justify="flex-end">
					<Typography.Text>Actions</Typography.Text>
				</Flex>
			),
			render: (record) => (
				<Flex justify="flex-end" align="center">
					<Actions
						record={record}
						handleButtonClick={handleBasketEdit}
						icon={<FormOutlined />}
						tooltipTitle={'Edit'}
					/>
					<Actions
						handleButtonClick={handleBasketDuplicate}
						icon={<CopyOutlined />}
						tooltipTitle="Duplicate"
						record={record}
					/>
					<Actions
						handleButtonClick={handleBaskeDelete}
						icon={<DeleteOutlined />}
						tooltipTitle="Delete"
						record={record}
					/>
					<Actions
						handleButtonClick={handleBaskeMove}
						icon={<ArrowRightOutlined />}
						tooltipTitle={'Save'}
						record={record}
					/>
				</Flex>
			),
		},
	]

	return (
		<Flex vertical flex="1">
			<Table
				columns={columns}
				rowKey={'id'}
				pagination={false}
				scroll={{ y: 'calc(100vh - 230px)' }}
				locale={EmptyIndicator('No Saved Basket')}
				dataSource={savedBasket.filter((b) => b.exchange === exchange)}
			/>
		</Flex>
	)
}

export default SavedBaskets
