import RunesJson from "./runes.json";
import RunewordsJson from "./runewords.json";
import { ApplicationStore } from "./ApplicationStore";
import { createElement } from "./JSXFactory"

const fragment = document.createDocumentFragment();

const runeButtonsContainer = <div class="rune-buttons-container"></div>;

RunesJson.forEach(rune => {
	const outerButton = createRuneButton(rune);
	runeButtonsContainer.appendChild(outerButton);
});

fragment.appendChild(runeButtonsContainer);
document.body.appendChild(fragment);

RunewordsJson.forEach(runeWordJson => {
	fragment.appendChild(createRunewordCard(runeWordJson));
});

document.body.appendChild(fragment);

function playRuneSound() {
	const audio = new Audio("./static/rune.mp3");
	audio.play();
}

function createRuneButton(rune: typeof RunesJson[0]): HTMLDivElement {
	const outerButton =
		<div class="rune-outer-button">
			<p class="rune-button-caption">{rune.Name}</p>
		</div>;

	const runeButton =
		<button class="rune-button">
			<img class="rune-icon" src={rune.ImageFile}></img>
		</button>;

	runeButton.addEventListener("click", (e: Event) => {
		playRuneSound();
		ApplicationStore.runeButtonActivated(rune.Name);
	});
	ApplicationStore.runeButtonsByName.set(rune.Name, runeButton);

	outerButton.appendChild(runeButton);
	return outerButton;
}

function createRunewordCard(runeword: typeof RunewordsJson[0]): HTMLDivElement {
	const runeWordCardElement = document.createElement("div");
	runeWordCardElement.className = "runeword-card";
	const runeCardNameElement = document.createElement("p");
	runeCardNameElement.innerHTML = `<a href="${runeword.Url}" class="runeword-card-name" target="_blank">${runeword.Name}</a>`;
	runeCardNameElement.classList.add("runeword-card-name");
	runeCardNameElement.classList.add("runeword-card-text");
	runeWordCardElement.appendChild(runeCardNameElement);
	ApplicationStore.runeCardsByName.set(runeword.Name, runeWordCardElement);

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