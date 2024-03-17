import { naive_solver, items } from "./knapsack.js";


async function start_clock(step){
    const timer = document.getElementById("timer");
    let elapsed_time = 0;

    setInterval(function(){
        let ms = elapsed_time % 1000;
        let seconds = Math.floor(elapsed_time / 1000) % 60;
        let minutes = Math.floor((elapsed_time / 1000) / 60) % 60;
        let t = [
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0'),
            String(ms).padStart(3, '0')
        ];
        elapsed_time = elapsed_time + 100;
        timer.textContent = t.join(' : ');
    }, step);
};

function generate_table(items, selector){
    let template = document.getElementById("template-table");
    
    for (let i = 0; i < items.length; i++){
        let clone = template.content.cloneNode(true);
        clone.querySelector('.name').textContent = items[i].name;
        clone.querySelector('.value').textContent = items[i].value;
        clone.querySelector('.size').textContent = items[i].size;
        document.querySelector(selector).appendChild(clone);
    }
}

function init_loading_text(){
    const typeWriter = document.querySelectorAll('.typewriter-text');
    const text = 'Calculating...';
    
    for (let i = 0; i < typeWriter.length; i++){
        typeWriter[i].innerHTML = text;
        typeWriter[i].style.setProperty('--characters', text.length);
    }
};

function erase(elem){
    if (!elem.classList.contains("none")){
        elem.classList.add("none");
    }
}

function emerge(elem){
    if (elem.classList.contains("none")){
        elem.classList.remove("none");
    }
}

const frmWorker = document.frmWorker.inputWorker;
const frmNoWorker = document.frmNoWorker.inputNoWorker;
const resultWorker = document.querySelector('#worker > .result-container');
const resultNoWorker = document.querySelector('#no-worker > .result-container');
const btnWorker = document.querySelector('button.worker');
const btnNoWorker = document.querySelector('button.no-worker');
const txtValueWorker = document.querySelector('#worker > .result-container > .total-value > span');
const txtValueNoWorker = document.querySelector('#no-worker > .result-container > .total-value > span');
const txtSizeWorker = document.querySelector('#worker > .result-container > .total-size > span');
const txtSizeNoWorker = document.querySelector('#no-worker > .result-container > .total-size > span');
const tblWorker = document.querySelector('#worker > .result-container > table > tbody');
const tblNoWorker = document.querySelector('#no-worker > .result-container > table > tbody');
const txtLoadWorker = document.querySelector('#worker > .typewriter-effect');
const txtLoadNoWorker = document.querySelector('#no-worker > .typewriter-effect');

var cap_worker = frmWorker.value;
var cap_no_worker = frmNoWorker.value;

/*  './js/worker.js'
    Specify the relative path of worker.js from index.html
    because main.js is inserted into index.html

    {type: 'module'}
    You need this option so that you can import external module in worker.js
    with "import {...} from modulePath;".
*/
var worker = new Worker('./js/worker.js', {type: 'module'});

start_clock(100);
init_loading_text();
generate_table(items, '#t-container-full-list > tbody');
frmWorker.addEventListener('change', () => { cap_worker = frmWorker.value; });
frmNoWorker.addEventListener('change', () => { cap_no_worker = frmNoWorker.value; });

worker.addEventListener('message', function(e){
    const data = e.data;
    switch(data.command){
    case 'greeting':
        console.log(`From the Worker: ${data.res}`);
        break;
    case 'knapsack':
        generate_table(data.list, '#t-container-worker > tbody');
        txtValueWorker.textContent = data.total_value;
        txtSizeWorker.textContent = data.total_size;
   
        erase(txtLoadWorker);
        emerge(resultWorker);
    };
}, false);

// say hello to worker.
worker.postMessage({'command': 'greeting'});

btnWorker.addEventListener("click", () => {
    erase(resultWorker);
    emerge(txtLoadWorker);
    tblWorker.innerHTML = "";
    
    worker.postMessage({'command': 'knapsack', 'capacity': cap_worker});
});

btnNoWorker.addEventListener("click", () => {
    erase(resultNoWorker);
    emerge(txtLoadNoWorker);
    tblNoWorker.innerHTML = "";
    
    let result = naive_solver(items, cap_no_worker);
    
    generate_table(result.list, '#t-container-no-worker > tbody');
    txtValueNoWorker.textContent = result.total_value;
    txtSizeNoWorker.textContent = result.total_size;
    
    erase(txtLoadNoWorker);
    emerge(resultNoWorker);
});