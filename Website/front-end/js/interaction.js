// interaction.js

document.addEventListener('DOMContentLoaded', function () {
    var workButton = document.getElementById('workButton');
    var buttons = document.querySelectorAll('button');
    var filterSection = document.getElementById('filterSection');
    var locateButton = document.getElementById('locateButton');
    var demoButton = document.getElementById('demoButton');
    var clearFiltersButton = document.getElementById('clearFiltersButton');

    workButton.addEventListener('click', function () {
        //Add activated state class
        workButton.classList.add('active');

        // Remove the activation state class of other buttons
        buttons.forEach(function (btn) {
            if (btn !== workButton) {
                btn.classList.remove('active');
            }
        });

        // Remove the activation state class of filterSection
        filterSection.classList.remove('active');
    });

    // Remove the activation state class of workButton when clicking filterSection, clearFiltersButton
    [filterSection, clearFiltersButton].forEach(function (element) {
        element.addEventListener('click', function () {
            workButton.classList.remove('active');
        });
    });


});
