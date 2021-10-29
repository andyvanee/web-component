const padX = (number, length) => {
    return parseInt(number, 10)
        .toString(16)
        .padStart("0", length)
        .slice(0, length)
}

const mid = padX(Math.random() * 16777215, 6)

// Just fake a process id for browser
const pid = padX((Math.random() * 127).toFixed(0), 4)

export const mongoid = () => {
    const now = padX(Date.now() / 1000, 8)
    const sid = padX(Math.random() * 16777215, 6)
    return `${now}${mid}${pid}${sid}`
}
