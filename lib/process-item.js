function fromInventory(sku, qty, runningInventory, items, itemAssembly, processes) {
  let result = {
    sku: sku
  };

  if (!qty) {
    result.error = "Missing qty";
    return result;
  }

  console.log(`lookup item in runningInventory ${sku}`)
  let inventoriedItem = runningInventory.find((i) => i.sku == sku);
  if (!inventoriedItem) {
    result.error = "Unknown sku";
    return result;
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
      result.make = qtyNeeded;
      let _process = processes.find((p) => p.id == item.process.id);
      result.process = _process.name;
      result.processId = _process.id;
      result.time = _process.time * qtyNeeded;
      let childResults = fromAssembly(sku, qtyNeeded, runningInventory, items, itemAssembly, processes);
      result.childItems = childResults;
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
  return result;
}

function fromAssembly(sku, qty, runningInventory, items, itemAssembly, processes) {
  let parts = itemAssembly.filter((i) => i.finishedSku == sku);
  let results = parts.map((p) => {
    return fromInventory(p.rawSku, p.qty * qty, runningInventory, items, itemAssembly, processes);
  });
  return results;
}

module.exports = { fromInventory, fromAssembly }
