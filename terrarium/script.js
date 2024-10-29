document.addEventListener('DOMContentLoaded', function () {
    let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
    let maxZ = 0; 
    var seletedPlant = null;
    var plants = document.querySelectorAll('.plant');

    plants.forEach(function(plant) {
        plant.addEventListener('dragstart', function (e) {    
            e.dataTransfer.setData('text/plain', e.target.id);
            pos3 = e.clientX;
            pos4 = e.clientY;
            seletedPlant = e.target;

            for (let i = 0; i < plants.length; i++) {
                let zIndex = window.getComputedStyle(plants[i]).zIndex;                
                maxZ = Math.max(maxZ, parseInt(zIndex));
            }
            plant.style.zIndex = maxZ + 1;
        });

        plant.addEventListener('dragend', function(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            plant.style.left = plant.offsetLeft - pos1 + 'px';
            plant.style.top = plant.offsetTop - pos2 + 'px';
            seletedPlant = null;
        });

        plant.addEventListener('dragover', function (e) {    
            if (seletedPlant == e.target) {
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                plant.style.left = plant.offsetLeft - pos1 + 'px';
                plant.style.top = plant.offsetTop - pos2 + 'px';
            }
        });

         plant.addEventListener('dblclick', function(e) {                   
            for (let i = 0; i < plants.length; i++) {
                let zIndex = window.getComputedStyle(plants[i]).zIndex;                
                maxZ = Math.max(maxZ, parseInt(zIndex));
            }
            plant.style.zIndex = maxZ + 1;
        });
    });
});


// dragElement(document.getElementById('plant1'));
// dragElement(document.getElementById('plant2'));
// dragElement(document.getElementById('plant3'));
// dragElement(document.getElementById('plant4'));
// dragElement(document.getElementById('plant5'));
// dragElement(document.getElementById('plant6'));
// dragElement(document.getElementById('plant7'));
// dragElement(document.getElementById('plant8'));
// dragElement(document.getElementById('plant9'));
// dragElement(document.getElementById('plant10'));
// dragElement(document.getElementById('plant11'));
// dragElement(document.getElementById('plant12'));
// dragElement(document.getElementById('plant13'));
// dragElement(document.getElementById('plant14'));

// function dragElement(terrariumElement) {
//     let pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;

//     terrariumElement.onpointerdown = pointerDrag;
//     terrariumElement.ondblclick = doubleClick;

//     function pointerDrag(e) {
//         e.preventDefault();
//         console.log(e);
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onpointermove = elementDrag;
//         document.onpointerup = stopElementDrag;
//     }

//     function elementDrag(e) {
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         console.log(pos1, pos2, pos3, pos4);
//         terrariumElement.style.top = terrariumElement.offsetTop - pos2 + 'px';
//         terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + 'px';
//     }

//     function stopElementDrag() {
//         document.onpointerup = null;
//         document.onpointermove = null;
//     }

//     function doubleClick() {
//         let maxZ = 0;
//         let plants = document.getElementsByClassName('plant');

//         for (let i = 0; i < plants.length; i++) {
//             let zIndex = window.getComputedStyle(plants[i]).zIndex;
//             maxZ = Math.max(maxZ, parseInt(zIndex));
//         }
//         terrariumElement.style.zIndex = maxZ + 1;
//     }

// }