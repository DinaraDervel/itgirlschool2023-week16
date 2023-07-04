const thisForm = document.forms.form;
const inputs = document.querySelectorAll("input");
const select = document.querySelector("select");
const errorMessage = document.getElementsByClassName('error');
const selectErrorMessage = document.getElementsByClassName('error-select');
let errors = [];

function checkValidity(input, index) {
	let validity = input.validity;
	let localErrors = [];
	if (validity.typeMismatch) {
		localErrors.push('Incorrect filling format');
	}
	if (validity.patternMismatch) {
		localErrors.push('Does not match the filling pattern');
	}

	if (validity.rangeOverflow) {
		localErrors.push('The value exceeds the maximum permissible value');
	}

	if (validity.rangeUnderflow) {
		localErrors.push('The value is less than the minimum allowable');
	}

	if (validity.stepMismatch) {
		localErrors.push('Invalid value according to the step');
	}

	if (validity.tooLong) {
		localErrors.push('The value is too long');
	}

	if (validity.tooShort) {
		localErrors.push('The value is too short');
	}

	if (validity.valueMissing) {
		localErrors.push('You need to fill in the field');
	}

	//check validity of email
	if (input.getAttribute('type') === 'email' && !(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu).test(input.value)) {
		localErrors.push('Email must be in the format email@domain.com');
	}

	//check validity of passwords
	if (input.getAttribute('type') === 'password' && !(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).test(input.value)) {
		localErrors.push('Password must contain at least one uppercase letter, one lowercase letter, and one number');
	}
	if (input.getAttribute('type')) {
		const passwords = document.querySelectorAll('input[type="password"]');
		if (passwords[0].value !== passwords[1].value) {
			localErrors.push('Passwords don\'t match');
		}
	}

	errors[index] = localErrors;
}

function checkAll() {
	let i = 0;
	for (let input of inputs) checkValidity(input, i++);
	checkValidity(select, i);
}


function showErrorMessage() {
	let i = 0;
	for (let input of inputs) {
		if (errors[i].length !== 0) input.classList.add('incorrect');
		else input.classList.remove('incorrect');
		errorMessage[i].textContent = errors[i].join('. ');
		i++;
	}
	if (errors[i].length !== 0) select.classList.add('incorrect');
	else select.classList.remove('incorrect');
	selectErrorMessage[0].textContent = errors[i].join('. ');
}


thisForm.addEventListener('submit', (e) => {
	e.preventDefault();
	errors = [];
	checkAll();
	showErrorMessage()
	let k = 0;
	for (let i = 0; i < errors.length; i++) {
		if (errors[i].length === 0) k++;
	}
	if (k === errors.length) {
		for (let input of inputs)
			if (input.type === "radio" && !input.checked) continue;
			else console.log(input.value);
		console.log(select.value);
		thisForm.reset();
	}
});


thisForm.addEventListener('change', (e) => {
	e.preventDefault();
	errors = [];
	checkAll();
	showErrorMessage();
});