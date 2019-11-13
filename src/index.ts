import RunesJson from './runes.json';
import RunewordsJson from './runewords.json';
import { ApplicationState } from './ApplicationState';
import { Runeword } from './Runeword';

const runeButtonsFrag = document.createDocumentFragment();

const runeButtonsContainer = document.createElement("div");
runeButtonsContainer.className = "rune-buttons-container";

RunesJson.forEach(runeJson => {
	const outerButton = document.createElement("div");
	outerButton.className = "rune-outer-button";

	const buttonCaption = document.createElement("p");
	buttonCaption.className = "rune-button-caption";
	buttonCaption.innerText = `${runeJson.Name}`;
	outerButton.appendChild(buttonCaption);

	const runeButton = document.createElement("button");
	runeButton.className = "rune-button";
	runeButton.innerHTML = `<img class="rune-icon" src="${runeJson.ImageFile}">`;
	runeButton.addEventListener("click", (e: Event) => {
		playRuneSound();
		ApplicationState.runeButtonActivated(runeJson.Name);
	});
	outerButton.appendChild(runeButton);
	runeButtonsContainer.appendChild(outerButton);
	ApplicationState.runeButtonsByName.set(runeJson.Name, runeButton);
});

runeButtonsFrag.appendChild(runeButtonsContainer);
document.body.appendChild(runeButtonsFrag);

const runeWordCardsFragment = document.createDocumentFragment();

RunewordsJson.forEach(runeWordJson => {
	runeWordCardsFragment.appendChild(createRunewordCard(runeWordJson));
});

document.body.appendChild(runeWordCardsFragment);

function playRuneSound() {
	const audio = new Audio("./static/rune.mp3");
	audio.play();
}

function createRunewordCard(runeword: Runeword): HTMLDivElement {
	const runeWordCardElement = document.createElement("div");
	runeWordCardElement.className = "runeword-card";

	const runeCardNameElement = document.createElement("p");
	runeCardNameElement.innerHTML = `<a href="${runeword.Url}" class="runeword-card-name" target="_blank">${runeword.Name}</a>`;
	runeCardNameElement.classList.add("runeword-card-name");
	runeCardNameElement.classList.add("runeword-card-text");
	runeWordCardElement.appendChild(runeCardNameElement);
	ApplicationState.runeCardsByName.set(runeword.Name, runeWordCardElement);

	const runeWordCardWordElement = document.createElement("p");
	runeWordCardWordElement.innerText = "'" + runeword.Runes.join("") + "'";
	runeWordCardWordElement.className = "runeword-card-word";
	runeWordCardWordElement.classList.add("runeword-card-text");
	runeWordCardElement.appendChild(runeWordCardWordElement);

	const runeWordCardItemsElement = document.createElement("p");
	runeWordCardItemsElement.innerText = runeword.Types.join(", ");
	runeWordCardItemsElement.className = "runeword-card-text";
	runeWordCardItemsElement.classList.add("runeword-card-items");
	runeWordCardElement.appendChild(runeWordCardItemsElement);

	// const hr = document.createElement("hr");
	// runeWordCardElement.appendChild(hr);

	const runeWordCardModElement = document.createElement("p");
	runeWordCardModElement.className = "runeword-card-text";
	runeWordCardModElement.classList.add("runeword-card-mod");
	runeWordCardModElement.innerHTML = runeword.Mods.join("<br/>");
	runeWordCardElement.appendChild(runeWordCardModElement);

	return runeWordCardElement;
}