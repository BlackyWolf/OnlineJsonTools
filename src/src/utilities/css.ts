export const joinCss = (...classes: (string | undefined)[]): string =>
    classes.filter(Boolean).join(' ');
