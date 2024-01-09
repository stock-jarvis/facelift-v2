import { Flex, Typography, Button, Tooltip, TableProps } from 'antd'
import { SavedBasket, EditType } from '../../types/types'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { Table } from 'antd'
import EmptyIndicator from '../common/empty-indicator'
import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons'

const Index = () => {
	const {
		exchange,
		savedBasket,
		setEditableBasket,
		deleteStoredBasket,
		createDuplicateStoredBasket,
		moveStoredToRuntimeBasket,
	} = useBasketStore()

	const handleBaskeDelete = (id: string) => {
		deleteStoredBasket(id)
	}
	const handleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.SAVED)
	}
	const handleBasketDuplicate = (id: string) => {
		const basket = savedBasket.find((basket) => basket.id === id)

		if (basket) {
			const baskets = savedBasket.filter((b) => b.name === basket.name)
			createDuplicateStoredBasket({
				...basket,
				id: generateUniqueId(),
				identifier: baskets[baskets.length - 1].identifier + 1,
			})
		}
	}
	const handleBaskeMove = (id: string) => {
		moveStoredToRuntimeBasket(id)
	}

	const columns: TableProps<SavedBasket>['columns'] = [
		{
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
			key: generateUniqueId(),
		},
		{
			title: <Flex justify="flex-end">Actions</Flex>,
			key: generateUniqueId(),
			render: (record) => (
				<Flex justify="flex-end" align="center">
					<Tooltip title="Edit">
						<Button
							size="small"
							icon={<FormOutlined />}
							type="text"
							shape="circle"
							onClick={handleBasketEdit.bind(this, record.id)}
						/>
					</Tooltip>
					<Tooltip title="Duplicate">
						<Button
							size="small"
							icon={<CopyOutlined />}
							type="text"
							shape="circle"
							onClick={handleBasketDuplicate.bind(this, record.id)}
						/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							size="small"
							icon={<DeleteOutlined />}
							type="text"
							shape="circle"
							onClick={handleBaskeDelete.bind(this, record.id)}
						/>
					</Tooltip>
					<Tooltip title="Move">
						<Button
							size="small"
							icon={<ArrowRightOutlined />}
							type="text"
							shape="circle"
							onClick={handleBaskeMove.bind(this, record.id)}
						/>
					</Tooltip>
				</Flex>
			),
		},
	]

	return (
		<Flex vertical flex="1">
			<Table
				locale={EmptyIndicator('No Saved Basket')}
				rowKey="id"
				dataSource={savedBasket.filter((b) => b.exchange === exchange)}
				columns={columns}
				pagination={false}
				scroll={{ y: 'calc(100vh - 230px)' }}
			/>
		</Flex>
	)
}

export default Index
