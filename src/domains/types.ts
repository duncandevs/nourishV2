export type FetchMethod = Promise<{
    data: any,
    error: any
}>

export type ActionParams = {
    set?: any,
    get?: any,
}