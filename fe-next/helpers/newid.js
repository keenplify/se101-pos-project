let lastId = 0;

export function newUniqueId (prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}