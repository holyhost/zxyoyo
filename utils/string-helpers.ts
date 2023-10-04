export function splitUppercase(value: string) {
    return value
        .trim()
        .split(/([A-Z][a-z]+|[0-9]+)/)
        .map((word) => word.trim())
        .join(' ');
}

function getUrlDomain(url: string) {
    // convert url string into a URL object and extract just the domain, avoiding subdomains
    // e.g. https://www.google.com/ -> google.com
    return new URL(url).hostname.split('.').slice(-2).join('.');
}

const tokenCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const tokenCharactersLength = tokenCharacters.length;
export function generateToken(length: number) {
    let result = '';
    for (let i = 0; i < length; i++)
        result += tokenCharacters.charAt(Math.floor(Math.random() * tokenCharactersLength));
    return result;
}

export function hashify(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

/**
 * @see https://stackoverflow.com/a/12900504
 */
export function getFileExtension(value: string) {
    return value.slice(((value.lastIndexOf('.') - 1) >>> 0) + 2);
}