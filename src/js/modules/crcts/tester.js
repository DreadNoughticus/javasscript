import { obfuscate } from "./gen.js";
import { evaluate } from "./eval.js";
let crct = new graphology.Graph({ type: "undirected" });

const xortt = {
    ff: false,
    tf: true,
    ft: true,
    tt: false
}

crct.addNode('xor1', {truthTable: xortt})
crct.addNode('xor2', {truthTale: xortt})
crct.addEdge('xor1', 'xor2')
crct.forEachNode((node) => {
})
