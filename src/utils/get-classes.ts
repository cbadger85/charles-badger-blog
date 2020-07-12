export const getClasses = (...args: unknown[]): string =>
  args
    .filter(arg => typeof arg === 'string')
    .map<string>(cls => (cls as string).trim())
    .join(' ');
