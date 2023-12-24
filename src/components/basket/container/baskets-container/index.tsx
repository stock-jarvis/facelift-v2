import {
	Flex,
	theme,
	Table,
	Button,
	Checkbox,
	Typography,
	Tooltip,
	Empty,
} from 'antd'

import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../common/utils/randomizer'
import { RunTimeBasketData } from '../../types/types'
import { useState, useEffect } from 'react'

const Index = () => {
	const { token } = theme.useToken()

	const [individualSelection, setIndividualSelection] = useState<boolean>(false)
	const [selectAll, setSelectAll] = useState<boolean>(false)

	const {
		runtimeBasketList,
		deleteRuntimeBasket,
		toogleEditModal,
		setEditableBasket,
		addNewRuntimeBasket,
		savedBaskets,
		toogleSaveError,
		updateSelection,
		addToStoredBaskets,
		updateSelectedBasket,
		selectAllBaskets,
	} = useBasketStore()

	const onHandleBasketEdit = (id: string) => {
		const basket = runtimeBasketList.find((basket) => basket.id === id)
		if (basket) {
			toogleSaveError(id, false)
		}
		setEditableBasket(id)
		toogleEditModal(true)
	}

	const onHandleBasketDuplicate = (name: string) => {
		const duplicateBasket = runtimeBasketList.filter(
			(basket) => basket.name === name
		)
		if (duplicateBasket[duplicateBasket.length - 1]) {
			addNewRuntimeBasket({
				...duplicateBasket[duplicateBasket.length - 1],
				id: generateUniqueId(),
				error: false,
				selected: false,
				identifier: duplicateBasket[duplicateBasket.length - 1].identifier + 1,
			})
		}
	}

	const onHandleBaskeSave = (id: string) => {
		const isBasketSaved = savedBaskets.find((basket) => basket.id === id)
		if (isBasketSaved) {
			addToStoredBaskets(isBasketSaved)
			//TODO: Tie this up with the api
		} else {
			toogleSaveError(id, true)
		}
	}

	const onHandleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const handleIndividualSelectChange = (id: string) => {
		setIndividualSelection(true)
		updateSelection(id)
	}

	const selectAllBasket = () => {
		setSelectAll(!selectAll)
	}

	useEffect(() => {
		if (individualSelection) {
			updateSelectedBasket()
			setIndividualSelection(false)
		}
	}, [runtimeBasketList, updateSelectedBasket, individualSelection])

	useEffect(() => {
		if (selectAll) {
			selectAllBaskets(true)
		} else {
			selectAllBaskets(false)
		}
	}, [selectAll, selectAllBaskets])
	const columns = [
		{
			title: (
				<Flex flex={1}>
					<Checkbox checked={selectAll} onChange={selectAllBasket} />
				</Flex>
			),
			dataIndex: '',
			render: (record: RunTimeBasketData) => (
				<Flex flex={1} key={record.id}>
					<Checkbox
						checked={record.selected}
						onChange={() => {
							handleIndividualSelectChange(record.id)
						}}
					/>
				</Flex>
			),
		},
		{
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-start" key={record.id + record.name}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
						{record.name}
						{record.identifier > 0 ? ` - ${record.identifier}` : ''}
					</Typography.Text>
				</Flex>
			),
			key: 'name',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Exchange
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-end" key={record.id + record.exchange}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : token.colorPrimary,
						}}
					>
						{record.exchange}
					</Typography.Text>
				</Flex>
			),
			dataIndex: '',
			key: 'exchange',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Istrument
				</Flex>
			),
			render: (record: RunTimeBasketData) => (
				<Flex flex="1" justify="flex-end" key={record.id + record.instrument}>
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
						{record.instrument}
					</Typography.Text>
				</Flex>
			),
			key: 'identifier',
		},
		{
			title: (
				<Flex flex={1} justify="flex-end">
					Actions
				</Flex>
			),
			dataIndex: '',
			render: (record: RunTimeBasketData) => (
				<Flex
					gap={'small'}
					flex={1}
					justify="flex-end"
					key={record.id + generateUniqueId()}
				>
					<Tooltip title="Edit">
						<Button
							shape="circle"
							type="text"
							icon={<FormOutlined />}
							onClick={() => onHandleBasketEdit(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Duplicate">
						<Button
							shape="circle"
							type="text"
							icon={<CopyOutlined />}
							onClick={() => onHandleBasketDuplicate(record.name)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Save">
						<Button
							shape="circle"
							type="text"
							icon={<SnippetsOutlined />}
							onClick={() => onHandleBaskeSave(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							shape="circle"
							type="text"
							icon={<DeleteOutlined />}
							onClick={() => onHandleBaskeDelete(record.id)}
							style={{
								color: record.error ? token.colorError : '',
							}}
						/>
					</Tooltip>
				</Flex>
			),
			key: 'actions',
		},
	]

	return (
		<Flex
			style={{
				overflowY: 'scroll',
				height: '100%',
				padding: token.paddingXS,
			}}
			flex="1"
			vertical
		>
			{runtimeBasketList.length > 0 ? (
				<Table
					scroll={{ y: 'calc(100vh - 200px)' }}
					columns={columns}
					dataSource={runtimeBasketList}
					pagination={false}
				/>
			) : (
				<Flex justify="center" flex={1} align="center">
					<Empty />
				</Flex>
			)}
		</Flex>
	)
}

export default Index
