import user_uncategorized from './lexicon/user_uncategorized.txt?raw'
import user_book from './lexicon/user_book.txt?raw'
import user_game from './lexicon/user_game.txt?raw'
import user_hot from './lexicon/user_hot.txt?raw'
import user_location from './lexicon/user_location.txt?raw'
import user_name from './lexicon/user_name.txt?raw'
import user_org from './lexicon/user_org.txt?raw'
export interface LexiconItem {
	words: string[],
	name: string,
	priority: number,
}

const regex = /\s*\n\s*/;

export function getLexicon(): LexiconItem[] {
	return [
		{
			words: (user_uncategorized as string).split(regex).filter(Boolean),
			name: 'uncategorized',
			priority: 2000,
		},
		{
			words: (user_book as string).split(regex).filter(Boolean),
			name: 'user_book',
			priority: 201,
		},
		{
			words: (user_game as string).split(regex).filter(Boolean),
			name: 'user_game',
			priority: 203,
		},
		{
			words: (user_hot as string).split(regex).filter(Boolean),
			name: 'user_hot',
			priority: 205,
		},
		{
			words: (user_name as string).split(regex).filter(Boolean),
			name: 'user_name',
			priority: 204,
		},
		{
			words: (user_org as string).split(regex).filter(Boolean),
			name: 'user_org',
			priority: 202,
		},
		{
			words: (user_location as string).split(regex).filter(Boolean),
			name: 'user_location',
			priority: 201,
		},
	]
}
