let data = require('./data');

let newOrder = {
  items: [
    {
      sku: "HAMMER-1",
      qty: 100
    }
  ]
}

const processItem = require('./lib/process-item');
const tasks = require('./lib/tasks');

// clone inventory so we can go about reducing it iteratively
let runningInventory = data.inventory.map((itm) => Object.assign({}, itm));

// iterate through the items on the order
newOrder.items.forEach((orderItem) => {
  orderItem.supplyChain = processItem.fromInventory(orderItem.sku, orderItem.qty, runningInventory, data.items, data.itemAssembly, data.processes);
  orderItem.tasks = tasks.fromSupplyChain(orderItem.supplyChain);
});

console.log(JSON.stringify(newOrder, null, 2));
