export const getTopLeftIndex = (i, size) => {
  if (i === 0) {
    return size * size - 1;
  } else if (i < size) {
    return size * size - size - 1 + i;
  } else if (i % size === 0) {
    return i - 1;
  } else {
    return i - size - 1;
  }
};
export const getTopMiddleIndex = (i, size) => {
  if (i < size) {
    return size * size - size + i;
  } else {
    return i - size;
  }
};
export const getTopRightIndex = (i, size) => {
  if (i === size - 1) {
    return size * size - size;
  } else if (i < size) {
    return size * size - size + i + 1;
  } else if ((i + 1) % size === 0) {
    return i - 2 * size + 1;
  } else {
    return i - size + 1;
  }
};
export const getMiddleLeftIndex = (i, size) => {
  if (i % size === 0) {
    return i + size - 1;
  } else {
    return i - 1;
  }
};
export const getMiddleRightIndex = (i, size) => {
  if ((i + 1) % size === 0) {
    return i - size + 1;
  } else if (i === size * size - 1) {
    return 0;
  } else {
    return i + 1;
  }
};
export const getBottomLeftIndex = (i, size) => {
  if (i === size * size - size) {
    return size - 1;
  } else if (i > size * size - size) {
    return (i % size) - 1;
  } else if (i % size === 0) {
    return i + 2 * size - 1;
  } else {
    return i + size - 1;
  }
};
export const getBottomMiddleIndex = (i, size) => {
  if (i >= size * size - size) {
    return i % size;
  } else {
    return i + size;
  }
};
export const getBottomRightIndex = (i, size) => {
  if (i === size * size - 1) {
    return 0;
  } else if (i >= size * size - size) {
    return (i % size) + 1;
  } else if ((i + 1) % size === 0) {
    return i + 1;
  } else {
    return i + size + 1;
  }
};
