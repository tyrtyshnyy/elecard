export function bytesToSize(byte: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!byte) {
        return '0 Byte'
    }
    const i = Math.floor(Math.log(byte) / Math.log(1024))

    return `${Math.round(byte / Math.pow(1024, i))} ${sizes[i]}`
}
