export function naive_solver(items, capacity){
    
    let res = {list: [], total_size: 0, total_value: 0};

    for (let bits = 0; bits < (1 << items.length); bits++){
        let value_sum = 0;
        let size_sum = 0;
        let selected = []
        
        for (let i = 0; i < items.length; i++){
            if (bits & (1 << i)){
                value_sum += items[i].value;
                size_sum += items[i].size;
                selected.push(items[i]);
            }
        }

        if (size_sum > capacity){ continue; }
        
        if (value_sum > res.total_value){
            res.total_value = value_sum;
            res.total_size = size_sum;
            res.list = selected;
        }
    }

    console.log(res);
    return res;
}

export const items = [ 
    {name: 'coffee', value: 120, size: 10},
    {name: 'tea', value: 145, size: 13},
    {name: 'water', value: 130, size: 12},
    {name: 'banana', value: 80, size: 7},
    {name: 'orange', value: 150, size: 11},
    {name: 'apple', value: 100, size: 9},
    {name: 'pear', value: 170, size: 13},
    {name: 'cucumber', value: 120, size: 10},
    {name: 'eggplant', value: 140, size: 11},
    {name: 'radish', value: 180, size: 18},
    {name: 'ginger', value: 110, size: 8},
    {name: 'bread', value: 185, size: 16},
    {name: 'pasta', value: 160, size: 12},
    {name: 'rice', value: 300, size: 28},
    {name: 'tuna', value: 900, size: 90},
    {name: 'salmon', value: 800, size: 76},
    {name: 'tissue', value: 200, size: 18},
    {name: 'hanger', value: 250, size: 25},
    {name: 'battery', value: 370, size: 29},
    {name: 'soap', value: 130, size: 12},
    {name: 'shampoo', value: 300, size: 23},
    {name: 'dryer', value: 500, size: 45},
    {name: 'comb', value: 220, size: 20},
    {name: 'flyingpan', value: 600, size: 60},
    {name: 'bowl', value: 570, size: 50}
];