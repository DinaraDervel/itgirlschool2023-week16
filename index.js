const thisForm = document.forms.form;
console.log(thisForm);

let errors = [], flags = [];

function checkValidity(input, index) {
	let validity = input.validity;
	let localErrors = [];
	if (validity.typeMismatch) {
		localErrors.push('Неверный формат заполнения');
	}
	if (validity.patternMismatch) {
		localErrors.push('Не соответствует паттерну заполнения');
	}

	if (validity.rangeOverflow) {
		localErrors.push('Значение превосходит максимально допустимое');
	}

	if (validity.rangeUnderflow) {
		localErrors.push('Значение меньше минимально допустимого');
	}

	if (validity.stepMismatch) {
		localErrors.push('Недопустимое значение в соответствии с шагом');
	}

	if (validity.tooLong) {
		localErrors.push('Значение слишком длинное');
	}

	if (validity.tooShort) {
		localErrors.push('Значение слишком короткое');
	}

	if (validity.valueMissing) {
		localErrors.push('Необходимо заполнить поле');
	}
	errors[index] = localErrors;
}

function checkAll() {
	let inputs = document.querySelectorAll("input");
	let select = document.querySelector("select");
	let i = 0;
	for (let input of inputs) {
		checkValidity(input, i);
		if (errors[i].length !== 0) {
			if (!flags[i]) {
				input.classList.add('incorrect');
				const errorMessage = document.createElement('span');
				errorMessage.textContent = errors[i].join('. ');
				errorMessage.classList.add("error");
				input.parentElement.appendChild(errorMessage);
				flags[i] = 1;
			}
		}
		else {
			input.classList.remove('incorrect');
			clearErrors(i);
			flags[i] = 0;
		}
		i++;
	}
	checkValidity(select, i);
	if (errors[i].length !== 0) {
		if (!flags[i]) {
			select.classList.add('incorrect');
			const errorMessage = document.createElement('span');
			errorMessage.textContent = errors[i].join('. ');
			errorMessage.classList.add("error");
			select.parentElement.appendChild(errorMessage);
			flags[i] = 1;
		}
	} else {
		select.classList.remove('incorrect');
		clearErrors(i);
		flags[i] = 0;
	}
	console.log(errors);
	console.log(flags);
}

function clearErrors(index) {
	let inputs = document.querySelectorAll("input");
	let select = document.querySelector("select");
	let errorMessages = document.getElementsByClassName('error');
	console.log(errorMessages);

	// for (let input of inputs) input.classList.remove('incorrect');
	// select.classList.remove('incorrect');
	if (errorMessages.length !== 0) errorMessages[index].remove();
	console.log(errorMessages);

}


thisForm.addEventListener('submit', (e) => {
	e.preventDefault();
	errors = [];
	//flags = [];
	checkAll();
	let k = 0;
	for (let i = 0; i < errors.length; i++) {
		if (errors[i].length === 0) k++;
	}
	if (k === errors.length) thisForm.reset();
});
// document.querySelectorAll('input').forEach((el, index) => el.addEventListener('change', () => {
// 	// 	checkValidity(el, index);
// 	checkAll();

// }));