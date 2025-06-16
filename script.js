const syndicateRadio = document.getElementById('syndicate');
const campusBodyRadio = document.getElementById('campus-body');
const syndicateField = document.getElementById('syndicate-field');
const campusField = document.getElementById('campus-field');
const districtSelect = document.getElementById('district');
const campusNameInput = document.getElementById('campus-name');

function toggleFields() {
// Reset both fields first
syndicateField.classList.remove('show');
campusField.classList.remove('show');
districtSelect.required = false;
campusNameInput.required = false;

// Then show the appropriate field
if (syndicateRadio.checked) {
    setTimeout(() => {
        syndicateField.classList.add('show');
        districtSelect.required = true;
    }, 50);
} else if (campusBodyRadio.checked) {
    setTimeout(() => {
        campusField.classList.add('show');
        campusNameInput.required = true;
    }, 50);
}
}

// Add event listeners for radio buttons
syndicateRadio.addEventListener('change', toggleFields);
campusBodyRadio.addEventListener('change', toggleFields);

// Call toggleFields on page load to set initial state
document.addEventListener('DOMContentLoaded', toggleFields);

// Add click event listeners to the entire radio option divs
document.querySelectorAll('.radio-option').forEach(option => {
option.addEventListener('click', function() {
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;
    toggleFields();
});
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
e.preventDefault();

const formData = new FormData(this);
const data = Object.fromEntries(formData);

// Basic validation
if (!data.name || !data.contact || !data.position) {
    alert('Please fill in all required fields.');
    return;
}

if (data.position === 'syndicate' && !data.district) {
    alert('Please select a district.');
    return;
}

if (data.position === 'campus-body' && !data['campus-name']) {
    alert('Please enter your campus name.');
    return;
}

// Success message
alert('Registration successful! Thank you for joining Conscious Campus.');
console.log('Form submitted:', data);
});