export const movementRejected = (destination, source, availableSquares) => {
  if (!destination) {
    return true;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true;
  }

  return false;
}
