const getManhattanDistance = (vecA, vecB) => {
    return vecA
        .map((num, index) => Math.abs(num - vecB[index]))
        .reduce((sum, diff) => sum + diff, 0);
};

// Yes, yes, this is a standing function. I have three hours left and i haven't even finished my video so gimme a break.
// The python version has real functioning circuits, and teh circuitverse link has the yet-to-be-ported circuit. I have all the parts, i just don't have the time to put them together.
export function evaluate(encryptedVec, evaluator, peer1, peer2, peer3, peer4) {
    const distances = [
        { name: 'evaluator', distance: getManhattanDistance(encryptedVec, evaluator) },
        { name: 'p1Node',     distance: getManhattanDistance(encryptedVec, peer1) },
        { name: 'p2Node',     distance: getManhattanDistance(encryptedVec, peer2) },
        { name: 'p3Node',     distance: getManhattanDistance(encryptedVec, peer3) },
        { name: 'p4Node',     distance: getManhattanDistance(encryptedVec, peer4) }
    ];

    const closestPeer = distances.reduce((closest, current) => {
        return current.distance < closest.distance ? current : closest;
    });
    
    return closestPeer.name; 
}
