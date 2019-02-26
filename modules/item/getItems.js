module.exports = () => {
  return [
    {
      sku: "HAMMER-1",
      process: {
        id: 21,
      },
      assembly: [
        {
          finishedSku: "HAMMER-1",
          rawSku: "HAMMER-HEAD",
          qty: 1,
        },
        {
          finishedSku: "HAMMER-1",
          rawSku: "HAMMER-HANDLE",
          qty: 1,
        },
        {
          finishedSku: "HAMMER-1",
          rawSku: "LIQUID-ADHESIVE",
          qty: 0.25,
        },
      ],
    },
    {
      sku: "HAMMER-HEAD",
      procurement: {
        vendorId: 5532,
        leadDays: 20,
        productionDays: 12,
        shippingDays: 22,
      },
    },
    {
      sku: "HAMMER-HANDLE",
      process: {
        id: 1,
      },
      assembly: [
        {
          finishedSku: "HAMMER-HANDLE",
          rawSku: "WOOD-HANDLE",
          qty: 1,
        },
        {
          finishedSku: "HAMMER-HANDLE",
          rawSku: "HAMMER-STICKER",
          qty: 1,
        },
      ],
    },
    {
      sku: "WOOD-HANDLE",
      procurement: {
        vendorId: 4421,
        leadDays: 15,
        productionDays: 8,
        shippingDays: 21,
      },
    },
    {
      sku: "HAMMER-STICKER",
      procurement: {
        vendorId: 246,
        leadDays: 0,
        productionDays: 3,
        shippingDays: 14,
      },
    },
    {
      sku: "LIQUID-ADHESIVE",
      procurement: {
        vendorId: 423,
        leadDays: 0,
        productionDays: 0,
        shippingDays: 14,
      },
    }
  ];
}
