export function bytesToSize(byte: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (!byte) {
    return "0 Byte";
  }
  const i = Math.floor(Math.log(byte) / Math.log(1024));

  return `${Math.round(byte / Math.pow(1024, i))} ${sizes[i]}`;
}

export function Paginator<T>(items: T[], per_page: number) {
  const data = [];

  for (let i = 0; i < items.length; i += per_page) {
    data.push(items.slice(i, per_page + i));
  }
  return {
    data,
  };
}

export function createPages(
  pages: number[],
  pagesCount: number,
  currentPage: number
): void {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
