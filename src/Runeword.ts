export interface Runeword {
	readonly Name: string;
	readonly Runes: string[];
	readonly Types: string[];
	readonly Clvl: number;
	readonly Mods: string[];
	readonly Comments: string | null;
	readonly Ladder: boolean;
	readonly Url: string;
}
