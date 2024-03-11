document.addEventListener("DOMContentLoaded", function() {
    const toggleUnits = () => {
        const isChecked = document.querySelector('#unitSwitch').checked;
        const inchElements = document.querySelectorAll('.SizingChartChildren td:not(.leftHeader)');
        
        inchElements.forEach(element => {
            const dimensions = element.textContent.trim();
            const dimensionsArray = dimensions.split(' ');
            var ending = '';
            const convertedDimensions = dimensionsArray.map(dim => {
                dim = dim.trim();
                if (dimensionsArray.includes('in')) {
                    ending = ' cm';
                    let inches;
                    let centimeters;
                    try {
                        inches = parseInt(dim);
                        if (isNaN(inches)) {
                            throw new Error("Input is not a valid number");
                        }
                        centimeters = Math.round(inches * 2.54);
                    } catch(error) {
                        if (dim != 'in') {
                            centimeters = dim;
                        }
                    }
                    return centimeters;
                } else if (dimensionsArray.includes('cm')) {
                    ending = ' in';
                    let centimeters;
                    let inches;
                    try {
                        centimeters = parseInt(dim);
                        if (isNaN(centimeters)) {
                            throw new Error("Input is not a valid number");
                        }
                        inches = Math.round(centimeters / 2.54);
                    } catch(error) {
                        if (dim != 'cm') {
                            inches = dim;
                        }
                    }
                    return inches;
                } else {
                    return dim;
                }
            });
            element.textContent = convertedDimensions.join(' ') + ending;
        });
    };

    const switchInput = document.querySelector('#unitSwitch');
    switchInput.addEventListener('change', toggleUnits);
});
