// Initialize a new plugin instance for one element or NodeList of elements.

window.onload = function(){
  displayAgeInterval('0,100');

  var ageSlider = new rSlider({
          target: '#ageSlider',
          values: {min: 0, max: 100},
          step: 1,
          range: true,
          tooltip: false,
          scale: false,
          labels: false,
          onChange: displayAgeInterval
      });


      /* Functions that require the DOM to be laoded */

      function displayAgeInterval(values){
        let displayDiv = document.getElementById('ageIntervalDisplayer');
        let valueArray = getValues(values);
        let val1 = valueArray[0], val2 = valueArray[1];

        displayDiv.innerHTML = `<div>${val1} år</div><div>${val2} år</div>`

        displayDiv.children[0].addEventListener('click', function(event){
          makeInput(event.target, values, val1, 'start');
        });
        displayDiv.children[1].addEventListener('click', function(event){
          makeInput(event.target, values, val2, 'end');
        });
      }

      function makeInput(target, oldValues, val, pos){
        let ageInput = document.createElement('input');
        console.log(pos);
        ageInput.className = 'ageInput';
        ageInput.setAttribute('type', 'text');
        ageInput.setAttribute('placeholder',val);
        target.innerText = '';
        //target.innerHTML = '<input class="ageInput" type="text" ';

        // append the input.
        target.appendChild(ageInput);
        // Focus the input
        ageInput.focus();
        // Add eventListener for when the input gets blurred.
        ageInput.addEventListener('blur', function(event){
        let val1 = oldValues.split(',')[0];
        let val2 = oldValues.split(',')[1];
        console.log(oldValues);
          // Kolla position
          if(pos == 'start'){
            val1 = Number.parseInt(event.target.value);
            ageSlider.setValues(val1,val2);
          } else {
            val2 = Number.parseInt(event.target.value);
            ageSlider.setValues(val1,val2);
          }
          displayAgeInterval(val1 + ',' + val2);
        });
      }
  //end of callback
}


function getValues(values){
  console.log('VALUES BEFORE SPLIT: ', values);
  return values.split(',');
}
