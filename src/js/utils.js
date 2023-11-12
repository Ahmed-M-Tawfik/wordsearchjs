export function stringIsBlank(str) {
    return (!str || /^\s*$/.test(str));
}