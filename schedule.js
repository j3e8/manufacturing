let data = require('./data');

let newOrder = {
  items: [
    {
      sku: "HAMMER-1",
      qty: 100
    }
  ]
}

// clone inventory so we can go about reducing it iteratively
let runningInventory = data.inventory.map((itm) => Object.assign({}, itm));

// iterate through the items on the order
newOrder.items.forEach((orderItem) => {
  orderItem.supply = processItemFromInventory(orderItem.sku, orderItem.qty, runningInventory, data.items, data.itemAssembly, data.processes);
  let insufficientSupply = orderItem.supply.find((s) => s.error);
  orderItem.canFulfill = insufficientSupply ? false : true;
});

console.log(JSON.stringify(newOrder, null, 2));


function processItemFromInventory(sku, qty, runningInventory, items, itemAssembly, processes) {
  let result = {
    sku: sku
  };
  let results = [result];

  if (!qty) {
    result.error = "Missing qty";
    return results;
  }

  console.log(`lookup item in runningInventory ${sku}`)
  let inventoriedItem = runningInventory.find((i) => i.sku == sku);
  if (!inventoriedItem) {
    result.error = "Unknown sku";
    return results;
  }

  if (inventoriedItem.qty >= qty) {
    result.inventory = qty;
    inventoriedItem.qty -= qty;
  }
  else {
    let qtyNeeded = qty - inventoriedItem.qty;
    result.inventory = inventoriedItem.qty;
    inventoriedItem.qty = 0;
    let item = items.find((i) => i.sku == sku);
    if (item.process) {
      let _process = processes.find((p) => p.id == item.process.id);
      result.process = _process.name;
      result.time = _process.time * qtyNeeded;
      let childResults = processItemFromAssembly(sku, qtyNeeded, runningInventory, items, itemAssembly, processes);
      results = results.concat(childResults);
    }
    else if (item.procurement) {
      // need to get inventory from supplier
      result.purchase = qtyNeeded;
      result.leadDays = (item.procurement.leadDays || 0);
      result.productionDays = (item.procurement.productionDays || 0);
      result.shippingDays = (item.procurement.shippingDays || 0);
      result.totalDays = result.leadDays + result.productionDays + result.shippingDays;
    }
    else {
      result.error = "Not enough inventory";
    }
  }
  return results;
}

function processItemFromAssembly(sku, qty, runningInventory, items, itemAssembly, processes) {
  let parts = itemAssembly.filter((i) => i.finishedSku == sku);
  let results = parts.map((p) => {
    return processItemFromInventory(p.rawSku, p.qty * qty, runningInventory, items, itemAssembly, processes);
  });
  let flattened = [];
  results.forEach((r) => flattened = flattened.concat(r));
  return flattened;
}
