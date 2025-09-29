document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.Calculator');
    const display = document.getElementById('display');

    calculator.addEventListener('click', event => {
        // Ensure we only handle clicks on buttons
        if (!event.target.matches('button')) {
            return;
        }

        const button = event.target;
        const action = button.dataset.action;
        const buttonContent = button.textContent.trim();
        const currentDisplay = display.value;

        // Handle number and operator buttons
        if (!action) {
            if (currentDisplay === '0' || currentDisplay === '' || currentDisplay === 'Error') {
                display.value = buttonContent;
            } else {
                display.value = currentDisplay + buttonContent;
            }
        }

        // Handle special action buttons
        if (action === 'backspace') {
            if (currentDisplay.length > 1 && currentDisplay !== 'Error') {
                display.value = currentDisplay.slice(0, -1);
            } else {
                display.value = ''; // Let placeholder show '0'
            }
        }

        if (action === 'all-clear') {
            display.value = ''; // Let placeholder show '0'
        }

        if (action === 'calculate') {
            if (currentDisplay === '' || currentDisplay === 'Error') return;
            try {
                // Using eval() is a security risk in a real-world application
                // as it can execute arbitrary code. For this simple, controlled
                // calculator, it's a straightforward way to evaluate the expression.
                display.value = eval(currentDisplay);
            } catch (error) {
                display.value = 'Error';
            }
        }
    });
});