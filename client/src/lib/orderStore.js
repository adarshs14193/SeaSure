let currentOrder = null;

export function placeOrder(order) {
  currentOrder = order;
}

export function getOrder() {
  return currentOrder;
}

export function clearOrder() {
  currentOrder = null;
}
