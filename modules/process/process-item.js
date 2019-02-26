function fromInventory(sku, qty, runningInventory, items, processes) {
  const result = {
    sku: sku
  };

  if (!qty) {
    result.error = "Missing qty";
    return result;
  }

  console.log(`lookup item in runningInventory ${sku}`)
  const inventoriedItem = runningInventory.find((i) => i.sku == sku);
  if (!inventoriedItem) {
    result.error = "Unknown sku";
    return result;
  }

  if (inventoriedItem.qty >= qty) {
    result.inventory = qty;
    inventoriedItem.qty -= qty;
  }
  else {
    const qtyNeeded = qty - inventoriedItem.qty;
    result.inventory = inventoriedItem.qty;
    inventoriedItem.qty = 0;
    const item = items.find((i) => i.sku == sku);
    if (item.process) {
      result.make = qtyNeeded;
      const _process = processes.find((p) => p.id == item.process.id);
      result.process = _process.name;
      result.processId = _process.id;
      result.time = _process.time * qtyNeeded;
      const childResults = fromAssembly(sku, qtyNeeded, runningInventory, items, processes);
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

function fromAssembly(sku, qty, runningInventory, items, processes) {
  const parts = items.find(i => i.sku == sku).assembly;
  const results = parts.map((p) => {
    return fromInventory(p.rawSku, p.qty * qty, runningInventory, items, processes);
  });
  return results;
}

module.exports = { fromInventory, fromAssembly }
