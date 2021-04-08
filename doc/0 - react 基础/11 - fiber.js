/**
 * 深度优先遍历的思路：有儿子取儿子，没有儿子取最近的 拥有兄弟节点的祖先节点的 兄弟节点
 */
let A1 = {key: 'A1', return: null, sibling: null}
let B1 = {key: 'B1', return: A1, sibling: null}
let B2 = {key: 'B2', return: A1, sibling: null}
B1.sibling = B2
A1.children = B1

let C1 = {key: 'C1', return: B1, sibling: null}
let C2 = {key: 'C2', return: B1, sibling: null}
let C3 = {key: 'C3', return: B2, sibling: null}
let C4 = {key: 'C4', return: B2, sibling: null}
B1.children = C1
C1.sibling = C2
B2.children = C3
C3.sibling = C4


let nextUnitOfWork = A1
function workLoop(deadline) {
  while(nextUnitOfWork && (deadline.timeRemaining() > 1 || deadline.didTimeout)) {
    performUnitOfWork(nextUnitOfWork)
    if (nextUnitOfWork.children) nextUnitOfWork = nextUnitOfWork.children
    else nextUnitOfWork = getNext(nextUnitOfWork)
  }

  // !nextUnitOfWork || (deadline.timeRemaining() <=1 && !deadline.didTimeout)
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop)
  }
}

function performUnitOfWork (fiber) {
  console.log(`${fiber.key} begin`)
}

function getNext(fiber) {
  while(!fiber.sibling) {
    console.log(`${fiber.key} finish`)
    fiber = fiber.return
    if(!fiber) return
  }

  console.log(`${fiber.key} finish`)
  return fiber.sibling
}

requestIdleCallback(workLoop, {timeout: 2000})