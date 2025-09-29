var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
const csUL = document.querySelector("#cs-expanded");

CShamburgerMenu.addEventListener("click", function () {
	CShamburgerMenu.classList.toggle("cs-active");
	CSnavbarMenu.classList.toggle("cs-active");

	CSbody.classList.toggle("cs-open");
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector("#cs-expanded");
	const csExpanded = csUL.getAttribute("aria-expanded");

	if (csExpanded === "false") {
		csUL.setAttribute("aria-expanded", "true");
	} else {
		csUL.setAttribute("aria-expanded", "false");
	}
}

// render a cs-ul2 for each cs-dropdown
function renderAllDropdowns() {
	const csUL = document.querySelector("#cs-expanded"); // Target cs-ul directly
	const dropDowns = document.querySelectorAll("#cs-navigation .cs-dropdown");

	// Create empty cs-ul2 (active by default)
	const emptyUL2 = document.createElement("ul");
	emptyUL2.classList.add("cs-ul2", "cs-active");
	csUL.insertAdjacentElement("afterend", emptyUL2);

	// Create cs-ul2 for each dropdown
	dropDowns.forEach((dropdown, index) => {
		const dropUL = dropdown.querySelector(".cs-drop-ul");
		if (dropUL) {
			const newUL2 = document.createElement("ul");
			newUL2.classList.add("cs-ul2", "cs-hidden");
			newUL2.dataset.index = index;
			newUL2.innerHTML = dropUL.innerHTML;
			csUL.insertAdjacentElement("afterend", newUL2);
		}
	});
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll("#cs-navigation .cs-dropdown"));

dropDowns.forEach((item, index) => {
	const onClick = () => {
		item.classList.toggle("cs-active");
		csUL.classList.toggle("cs-active");

		dropDowns.forEach((otherItem) => {
			if (otherItem !== item) {
				otherItem.classList.remove("cs-active");
			}
		});

		const csULWrapper2 = document.querySelector(".cs-ul-wrapper2");
		const targetUL2 = csULWrapper2.querySelector(`[data-index="${index}"]`);

		if (item.classList.contains("cs-active")) {
			// Remove cs-active from all cs-ul2s
			csULWrapper2.querySelectorAll(".cs-ul2").forEach((ul) => {
				ul.classList.remove("cs-active");
				ul.classList.add("cs-hidden");
			});

			// Add cs-active to target cs-ul2
			if (targetUL2) {
				targetUL2.classList.add("cs-active");
				targetUL2.classList.remove("cs-hidden");
			}

			csULWrapper2.classList.add("cs-active");
		} else {
			// Hide target cs-ul2, show empty one
			if (targetUL2) {
				targetUL2.classList.remove("cs-active");
				targetUL2.classList.add("cs-hidden");
			}

			// Show empty cs-ul2
			const emptyUL2 = csULWrapper2.querySelector(".cs-ul2:not([data-index])");
			if (emptyUL2) {
				emptyUL2.classList.add("cs-active");
				emptyUL2.classList.remove("cs-hidden");
			}

			csULWrapper2.classList.remove("cs-active");
		}
	};
	item.addEventListener("click", onClick);
});

renderAllDropdowns();
