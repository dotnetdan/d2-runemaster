import RuneWords from "./runewords.json"

export class ApplicationStore {
	static readonly runeCardsByName: Map<string, HTMLElement> = new Map<string, HTMLElement>();
	static readonly runeButtonsByName: Map<string, HTMLElement> = new Map<string, HTMLElement>();
	private static readonly selectedRunes: Set<string> = new Set<string>();

	static runeButtonActivated(rune: string) {
		if (this.selectedRunes.has(rune)) {
			this.selectedRunes.delete(rune);
			const runeButton: HTMLElement | undefined = this.runeButtonsByName.get(rune);
			if (runeButton !== undefined) {
				runeButton.style.borderColor = "#9a8c58";

			}
		}
		else {
			this.selectedRunes.add(rune);
			const runeButton: HTMLElement | undefined = this.runeButtonsByName.get(rune);
			if (runeButton !== undefined) {
				runeButton.style.borderColor = "#ffa600";
			}
		}

		RuneWords.forEach(r => {
			if (r.Runes.every(x => this.selectedRunes.has(x))) {
				showRuneCard(r.Name);
			}
			else {
				hideRuneCard(r.Name);
			}
		});

		function hideRuneCard(runeName: string): void {
			const runeCard: HTMLElement | undefined = ApplicationStore.runeCardsByName.get(runeName);
			if (runeCard !== undefined) {
				runeCard.style.display = "none";
			}
		}

		function showRuneCard(runeName: string): void {
			const runeCard: HTMLElement | undefined = ApplicationStore.runeCardsByName.get(runeName);
			if (runeCard !== undefined) {
				runeCard.style.display = "block";
			}
		}
	}
}
