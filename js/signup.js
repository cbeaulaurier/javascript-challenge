/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

var form = document.getElementById('signup');
var occupationSelect = form.elements['occupation'];
var occupationOther = form.elements['occupationOther'];

document.addEventListener('DOMContentLoaded', function() {
    var stateSelect= form.elements['state'];
    var stateOption;

    var noButton = document.getElementById('cancelButton');


    // populate state list
    for (var idx = 0; idx < usStates.length; ++idx ) {
        stateOption = document.createElement('option');
        stateOption.innerHTML = usStates[idx].name;
        stateSelect.appendChild(stateOption);
    }
    // Show/hide other occupation input area
    occupationSelect.addEventListener('change', function() {
        if (occupationSelect.value == 'other') {
            occupationOther.style.display = 'block';
        } else {
            occupationOther.style.display = 'none';
        }
    });

    // confirm "no thanks"
    $('#cancelButton').click(function() {
        $('#confirm-exit-modal').modal();
    });

    $('#confirm-exit-button').click(function() {
        window.location = 'http://ischool.uw.edu';
    });

    // prevent default
    form.addEventListener('submit', function(evt) {
       var valid = true;

        try {
            valid = validateForm(this);
        } catch(exception) {
            console.log(exception);
            valid = false;
        }
        if (!valid && evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = valid;
        return valid;
    });

}); //DOMContentLoaded

// Checks to see if the form is filled out properly
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var formValid = true;

    // requires other field if other box is checked
    if (occupationSelect.value == 'other') {
        requiredFields.push('occupationOther');
    }

    for (idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    formValid &= validateZip(form.elements['zip']);

    formValid &= validateAge(form.elements['birthdate']);

    return formValid;
} // validateForm()

// Checks if all required fields have content in them
function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }

    return valid;
} // validateRequiredField()

// Checks to see if the zip is a 5 digit number
function validateZip(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    var zipValid = zipRegExp.test(zip.value);

    if (zipValid) {
        zip.className = 'form-control';
    } else {
        zip.className = 'form-control invalid-field';
    }

    return zipValid;
} // validateZip()

// Checks to see if the age is less than or greater than 13
function validateAge(birthdate) {
    var ageValid = true;
    var dob = birthdate.value;
    var age = moment().diff(dob, 'years');

    if (age < 13) {
        ageValid = false;
        var errMsg = document.getElementById('birthdateMessage');
        errMsg.innerHTML = "You must be 13 years old or older to sign up."
    }

    return ageValid;
} // validateAge()