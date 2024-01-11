import { Flex, Typography, TableProps } from 'antd'
import { SavedBasket, EditType } from '../../types/types'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { checkDuplicate } from '../../utils/duplicate-check'
import Actions, { ActionsButtonProps } from '../common/click-actions'
import EmptyIndicator from '../common/empty-indicator'
import { Table } from 'antd'
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

	const actions: ActionsButtonProps[] = [
		{
			handleButtonClick: handleBasketEdit,
			icon: <FormOutlined />,
			tooltipTitle: 'Edit',
		},
		{
			handleButtonClick: handleBasketDuplicate,
			icon: <CopyOutlined />,
			tooltipTitle: 'Duplicate',
		},

		{
			handleButtonClick: handleBaskeDelete,
			icon: <DeleteOutlined />,
			tooltipTitle: 'Delete',
		},
		{
			handleButtonClick: handleBaskeMove,
			icon: <ArrowRightOutlined />,
			tooltipTitle: 'Save',
		},
	]

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
					{actions.map((action) => (
						<Actions key={generateUniqueId()} {...action} record={record} />
					))}
				</Flex>
			),
		},
	]

	const tableProps: TableProps<SavedBasket> = {
		columns,
		rowKey: 'id',
		pagination: false,
		scroll: { y: 'calc(100vh - 230px)' },
		locale: EmptyIndicator('No Saved Basket'),
		dataSource: savedBasket.filter((b) => b.exchange === exchange),
	}
	return (
		<Flex vertical flex="1">
			<Table {...tableProps} />
		</Flex>
	)
}

export default Index
