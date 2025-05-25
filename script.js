const units = {
    length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
    weight: ['milligram', 'gram', 'kilogram', 'ounce', 'pound'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    time: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']
};

const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultDiv = document.getElementById('result');
const form = document.getElementById('converterForm');

function setupDropdowns() {
    [fromUnitSelect, toUnitSelect].forEach(select => {
        select.innerHTML = '<option value="">Select category first</option>';
    });
}
setupDropdowns();

categorySelect.addEventListener('change', function() {
    const category = this.value;
    const options = units[category] || [];
    
    [fromUnitSelect, toUnitSelect].forEach(select => {
        select.innerHTML = '';
        options.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            select.appendChild(option);
        });
    });
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const category = categorySelect.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const value = parseFloat(inputValue.value);

    if (!value) {
        resultDiv.textContent = "Please enter a valid number";
        return;
    }

    let result;
    switch(category) {
        case 'length':
            result = convertLength(value, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(value, fromUnit, toUnit);
            break;
        case 'temperature':
            result = convertTemperature(value, fromUnit, toUnit);
            break;
        case 'time':
            result = convertTime(value, fromUnit, toUnit);
            break;
        default:
            result = "Invalid category";
    }

    if (typeof result === 'number') {
        resultDiv.textContent = `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
    } else {
        resultDiv.textContent = result;
    }
});

function convertLength(value, from, to) {
    const factors = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.34
    };
    return (value * factors[from]) / factors[to];
}

function convertWeight(value, from, to) {
    const factors = {
        milligram: 0.000001,
        gram: 0.001,
        kilogram: 1,
        ounce: 0.0283495,
        pound: 0.453592
    };
    return (value * factors[from]) / factors[to];
}

function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'Celsius') celsius = value;
    if (from === 'Fahrenheit') celsius = (value - 32) * 5/9;
    if (from === 'Kelvin') celsius = value - 273.15;

    if (to === 'Celsius') return celsius;
    if (to === 'Fahrenheit') return (celsius * 9/5) + 32;
    if (to === 'Kelvin') return celsius + 273.15;
}

function convertTime(value, from, to) {
    const factors = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        months: 2592000,
        years: 31536000
    };
    return (value * factors[from]) / factors[to];
}