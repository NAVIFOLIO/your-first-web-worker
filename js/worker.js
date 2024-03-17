import {naive_solver, items} from "./knapsack.js";

self.addEventListener('message', (e) => {
    let data = e.data;
    
    switch (data.command){
    case 'greeting':
        self.postMessage({
            'command': 'greeting',
            'res': "Hello, Main Thread. I'm a Web Worker."
        });
        break;
    case 'knapsack':
        const capacity = data.capacity;
        let res = naive_solver(items, capacity);
    
        self.postMessage({
            'command': 'knapsack',
            'list': res.list,
            'total_value': res.total_value,
            'total_size': res.total_size
        });
        break;
    };
}, false);