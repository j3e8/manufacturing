
let inventory = [
  {
    sku: "HAMMER-1",
    qty: 50
  },
  {
    sku: "HAMMER-HEAD",
    qty: 40
  },
  {
    sku: "HAMMER-HANDLE",
    qty: 1
  },
  {
    sku: "WOOD-HANDLE",
    qty: 62
  },
  {
    sku: "HAMMER-STICKER",
    qty: 1000
  },
  {
    sku: "LIQUID-ADHESIVE",
    qty: 1321.8
  }
]


let items = [
  {
    sku: "HAMMER-1",
    process: {
      id: 21
    }
  },
  {
    sku: "HAMMER-HEAD",
    procurement: {
      vendorId: 5532,
      leadDays: 20,
      productionDays: 12,
      shippingDays: 22
    }
  },
  {
    sku: "HAMMER-HANDLE",
    process: {
      id: 1
    }
  },
  {
    sku: "WOOD-HANDLE",
    procurement: {
      vendorId: 4421,
      leadDays: 15,
      productionDays: 8,
      shippingDays: 21
    }
  },
  {
    sku: "HAMMER-STICKER",
    procurement: {
      vendorId: 246,
      leadDays: 0,
      productionDays: 3,
      shippingDays: 14
    }
  },
  {
    sku: "LIQUID-ADHESIVE",
    procurement: {
      vendorId: 423,
      leadDays: 0,
      productionDays: 0,
      shippingDays: 14
    }
  }
]


let processes = [
  {
    id: 1,
    name: "adhering",
    time: 40
  },
  {
    id: 34,
    name: "brazing",
    time: 12 * 60
  },
  {
    id: 21,
    name: "glueing",
    time: 8 * 60
  }
]


let itemAssembly = [
  {
    finishedSku: "HAMMER-1",
    rawSku: "HAMMER-HEAD",
    qty: 1
  },
  {
    finishedSku: "HAMMER-1",
    rawSku: "HAMMER-HANDLE",
    qty: 1
  },
  {
    finishedSku: "HAMMER-1",
    rawSku: "LIQUID-ADHESIVE",
    qty: 0.25
  },
  {
    finishedSku: "HAMMER-HANDLE",
    rawSku: "WOOD-HANDLE",
    qty: 1
  },
  {
    finishedSku: "HAMMER-HANDLE",
    rawSku: "HAMMER-STICKER",
    qty: 1
  }
]


module.exports = {
  inventory, items, processes, itemAssembly
}
