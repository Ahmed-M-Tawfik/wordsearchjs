export function stringIsBlank(str: string) {
    return (!str || /^\s*$/.test(str));
}