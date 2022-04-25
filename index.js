

async function transformText() {
	const input = document.querySelector("#original");
	const output = document.querySelector("#output");
	const originalText = input.value;
	const outputText = input.value;

	await new Promise(resolve => setTimeout(resolve, 1000));

	output.value = outputText;
}

function prepareActionButton() {
	const button = document.querySelector(".transformation__action");
	button.onclick = async () => {
		button.querySelector(".loader").classList.remove("hidden");
		await transformText();
		button.querySelector(".loader").classList.add("hidden");
	}
}


function main() {
	prepareActionButton();
}

window.onload = main;
