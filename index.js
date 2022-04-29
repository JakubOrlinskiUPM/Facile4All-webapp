
function transformDummy(text) {
	text = text.replace(
		"El martillo es usado por Juan en su trabajo.",
		"Juan usa el martillo en su trabajo."
	);
	return text.replace("inesperadamente", "manera inesperada");
}

async function transformText() {
	const input = document.querySelector("#original");
	const output = document.querySelector("#output");
	const originalText = input.value;
	const outputText = transformDummy(input.value);

	await new Promise(resolve => setTimeout(resolve, 1000));

	output.innerHTML = getHTML(originalText, outputText);
}

function toggleView() {
	const button = document.querySelector(".transformation__action");
	const buttonAlt = document.querySelector(".transformation__action-alt");
	button.classList.toggle("hidden");
	buttonAlt.classList.toggle("hidden");
}

function prepareActionButton() {
	const button = document.querySelector(".transformation__action");
	button.onclick = async () => {
		document.querySelector(".loading").classList.remove("hidden");
		await transformText();
		document.querySelector(".loading").classList.add("hidden");
		toggleView();
	}
	const buttonAlt = document.querySelector(".transformation__action-alt");
	buttonAlt.onclick = async () => {
		const input = document.getElementById("original");
		input.value = "";
		toggleView();
	}
}

function getHTML(input, output) {
	let outputHTML = ""
	const splitText = ".";
	let originalHTMLSent = input.split(splitText);
	let originalSent = input.split(splitText);
	let simplifiedSent = output.split(splitText);

	for (const idx in originalSent.filter((x) => x.length > 0)) {
		if (originalSent[idx] === simplifiedSent[idx]) {
			outputHTML += originalHTMLSent[idx] + splitText;
		} else {
			let originalText = originalSent[idx] + splitText;
			let outputText = simplifiedSent[idx] + splitText;
			outputHTML += getTooltipText(originalText, outputText)
		}
	}

	return outputHTML;
}

function getTooltipText(originalText, outputText) {
	let outputHTML = "";

	const intersection = (array1, array2) => {
		const set2 = new Set(array2);
		return array1.filter(x => set2.has(x));
	};

	const splitStr = " ";
	let orgSplit = originalText.split(splitStr);
	let outSplit = outputText.split(splitStr);
	const intersection_idx_out = intersection(outSplit, orgSplit);
	for (const idx in outSplit) {
		if (intersection_idx_out.includes(outSplit[idx])) {
			outputHTML += outSplit[idx] + splitStr;
		} else {
			outputHTML += "<span class='changed'>" + outSplit[idx] + splitStr + "</span>";
		}
	}
	return outputHTML;
}


function enterDummyData() {
	const input = document.getElementById("original");
	input.value = "El martillo es usado por Juan en su trabajo.\n\nSe requiere de una evaluación experta para combinar acertijos de comportamiento para poder crear una imagen inesperadamente nueva.";
}

function main() {
	enterDummyData();
	prepareActionButton();
}

window.onload = main;
