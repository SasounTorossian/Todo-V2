export const formatTime = (date: Date | undefined) => {
    return date?.toISOString().split("T")[0].split("-").reverse().join("/") || date?.toDateString()
}