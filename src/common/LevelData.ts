 export interface LevelData {
	code: string

	name?: string
	author?: string
	description?: string

	difficulty?: number

	timestamp?: Date
}

export const getLevelData = (object: { code: string; name: string; author: string; description: string; difficulty: number; timestamp: string }): LevelData => {
	return {
		code: object.code,
		name: object.name,
		author: object.author,
		description: object.description,
		difficulty: object.difficulty,
		timestamp: new Date(object.timestamp)
	}
}