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

	runeButton.addEventListener("click", () => {
		playRuneSound();
		ApplicationStore.runeButtonActivated(rune.Name);
	});
	ApplicationStore.runeButtonsByName.set(rune.Name, runeButton);

	outerButton.appendChild(runeButton);
	return outerButton;
}

function createRunewordCard(runeword: typeof RunewordsJson[0]): HTMLDivElement {
	const runewordCard =
		<div class="runeword-card">
			<p class="runeword-card-text runeword-card-name">
				<a class="runeword-card-name" href={runeword.Url} target="_blank">{runeword.Name}</a>
			</p>
			<p class="runeword-card-text runeword-card-word">
				{`'${runeword.Runes.join("")}'`}
			</p>
			<p class="runeword-card-text runeword-card-items">
				{runeword.Types.join(", ")}
			</p>
		</div>;
	
	runeword.Mods.forEach(x =>
		runewordCard.appendChild(<p class="runeword-card-text runeword-card-mod">{x}</p>)
	);

	ApplicationStore.runeCardsByName.set(runeword.Name, runewordCard);

	return runewordCard;
}