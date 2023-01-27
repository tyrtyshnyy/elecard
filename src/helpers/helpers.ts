export function bytesToSize(byte: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!byte) {
        return '0 Byte'
    }
    const i = Math.floor(Math.log(byte) / Math.log(1024))

    return `${Math.round(byte / Math.pow(1024, i))} ${sizes[i]}`
}


export function Paginator<T>(items: T[], page: number, per_page: number) {

    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
  
    paginatedItems: T[] = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
    };
  }


  export function createPages(pages: number[], pagesCount: number, currentPage: number) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for (let i = currentPage-4; i <= currentPage+5; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i == pagesCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}