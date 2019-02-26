const _ = require('lodash');
const inventory = require('./modules/inventory/getInventory')();
const processes = require('./modules/process/getProcesses')();
const items = require('./modules/item/getItems')();
const processItem = require('./modules/process/process-item');
const tasks = require('./modules/process/tasks');

const newOrder = {
  items: [
    {
      sku: "HAMMER-1",
      qty: 100
    }
  ]
};

// clone inventory so we can go about reducing it iteratively
const runningInventory = _.cloneDeep(inventory);

// iterate through the items on the order
newOrder.items.forEach((orderItem) => {
  orderItem.supplyChain = processItem.fromInventory(orderItem.sku, orderItem.qty, runningInventory, items, processes);
  orderItem.tasks = tasks.fromSupplyChain(orderItem.supplyChain);
});

console.log(JSON.stringify(newOrder, null, 2));
