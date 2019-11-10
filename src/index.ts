import RunewordsJson from './runewords.json';

const frag = document.createDocumentFragment();

RunewordsJson.forEach(x => {
	frag.appendChild(createRunewordCard(x));
});

document.body.appendChild(frag);

interface Runeword {
	readonly Name: string
	readonly Runes: string[]
	readonly Types: string[]
	readonly Clvl: number
	readonly Mods: string[]
	readonly Comments: string
	readonly Ladder: boolean
	readonly Url: string
}

function createRunewordCard(runeword: Runeword): HTMLDivElement {
	const runeWordCardElement = document.createElement("div");
	runeWordCardElement.className = "runeword-card";

	const runeCardNameElement = document.createElement("p");
	runeCardNameElement.innerText = runeword.Name;
	runeCardNameElement.classList.add("runeword-card-name");
	runeCardNameElement.classList.add("single-line");
	runeWordCardElement.appendChild(runeCardNameElement);

	const runeWordCardWordElement = document.createElement("p");
	runeWordCardWordElement.innerText = "'" + runeword.Runes.join("") + "'";
	runeWordCardWordElement.className = "runeword-card-word";
	runeCardNameElement.classList.add("single-line");
	runeWordCardElement.appendChild(runeWordCardWordElement);

	const runeWordCardModElement = document.createElement("p");
	runeWordCardModElement.className = "runeword-card-mod";
	runeWordCardModElement.innerHTML = runeword.Mods.join("<br/>");
	runeWordCardElement.appendChild(runeWordCardModElement);
	return runeWordCardElement;
}