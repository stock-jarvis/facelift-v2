import { SavedBasket } from '../types/types'
import { generateUniqueId } from './randomizer'
export const checkDuplicate = (
	basketData: SavedBasket[],
	id: string,
	name: string
) => {
	const duplicateBaskets = basketData.filter((basket) => basket.name === name)
	if (duplicateBaskets[duplicateBaskets.length - 1]) {
		return {
			...duplicateBaskets[
				duplicateBaskets.findIndex((basket) => basket.id === id)
			],
			id: generateUniqueId(),
			identifier: duplicateBaskets[duplicateBaskets.length - 1].identifier + 1,
			error: false,
		}
	}
}
