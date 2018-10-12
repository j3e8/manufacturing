/*
let tasks = [
  {
    id: 1,
    name: "Migrate CE out of Dais",
    days: 16,
    startDate: '2018-08-07'
  },
  {
    id: 2,
    name: "Beta test new platform & do migration",
    days: 7,
    startAfter: 1
  },
*/

function fromSupplyChain(supplyChain) {
  let paths = null;
  let currentTask;
  if (supplyChain.process) {
    currentTask = formatTask(supplyChain);
    supplyChain.childItems.forEach((child) => {
      let childPath = fromSupplyChain(child);
      if (childPath) {
        childPath.push(currentTask);
        if (!paths) paths = [];
        paths.push(childPath);
      }
    });
    if (!paths) {
      paths = [currentTask];
    }
  }
  return paths;
}

function formatTask(s) {
  return {
    make: s.make,
    name: s.process,
    processId: s.processId,
    time: s.time
  }
}

module.exports = { fromSupplyChain }
