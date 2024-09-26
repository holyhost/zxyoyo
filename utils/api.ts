

export function API(url: string){
    const host = process.env.NEXT_PUBLIC_APP_HOST
    return host + '/api' + url
}