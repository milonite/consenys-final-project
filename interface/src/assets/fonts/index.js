import Eksell from './Eksell.woff';
import FoundersMono from './foundersMonoRegular.woff';
import FoundersMedium from './founders-grotesk-test-medium.woff';

export const eksell = {
  fontFamily: 'Eksell',
  fontStyle: 'bold',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Eksell'),
    url(${Eksell}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const foundersMedium = {
  fontFamily: 'FoundersMedium',
  fontStyle: 'regular',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('FoundersMedium'),
    url(${FoundersMedium}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export const foundersMono = {
  fontFamily: 'FoundersMono',
  fontStyle: 'regular',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('FoundersMono'),
    url(${FoundersMono}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};