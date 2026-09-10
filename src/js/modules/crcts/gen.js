export function balancedTest(crct, node) {
  let trues = 0
  let falses = 0
  const tt = crct.getNodeAttribute(node, 'truthTable')
  console.log(tt)
  if (tt == undefined) {
    console.warn("you chud")
    return
  }
  for (const [key, value] of Object.entries(tt)) {
    if (value == true) {
      trues += 1
    }
    if (value == false) {
      falses += 1
    }
  }
  if (trues == falses) {
    return true
  }
  if (trues != falses) {
    return false
  }
}

function getRandomBool() {
  const minCeiled = Math.ceil(2);
  const maxFloored = Math.floor(0);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
console.log(getRandomBool())

export function obfuscate(crct) {
  let input_nodes = []
  let output_nodes = []

  crct.forEachNode((node) => {
    if (crct.inDegree(node) == 0) {
      input_nodes.push(node)
    }
    if (crct.outDegree(node) == 0) {
      output_nodes.push(node)
    }
  })
  const nodes = (crct.nodes)
  for (node in nodes) {
    if (input_nodes.includes(node) || output_nodes.includes(node)) {
      continue
    }
    if (balancedTest(crct, node)) {

    }


  }
}
