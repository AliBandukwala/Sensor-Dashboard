export const getChunk = (arr: Array<any>, size: number) => {
  const chunks = [];
  let i = 0;
  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += size)));
  }
  return chunks;
};

export const getNextPrevPagination = (
  totalPages: number,
  currentPage: number
) => {
  let previousPage = null;
  let nextPage = null;

  if (currentPage > totalPages || currentPage < 1) {
    return [previousPage, nextPage];
  }

  if (currentPage > 1) {
    previousPage = currentPage - 1;
  }

  if (currentPage + 1 < totalPages) {
    nextPage = currentPage + 1;
  }

  return [previousPage, nextPage];
};

export const getPagination = (totalPages: number, currentPage: number) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [previousPage, nextPage] = getNextPrevPagination(
    totalPages,
    currentPage
  );
  return {
    pages,
    previousPage,
    nextPage,
  };
};

export const getNextId = () => {
  return `nrf-${new Date().getTime().toString().substr(0, 8)}`;
};
