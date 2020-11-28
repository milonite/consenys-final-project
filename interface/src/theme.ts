import { createMuiTheme } from "@material-ui/core/styles";
import Commodore from './assets/fonts/Commodore.ttf';


const commodore = {
  fontFamily: 'Commodore',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Commodore'),
    url(${Commodore}) format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};


export const getTheme = () => {
  return (createMuiTheme as any)({
    typography: {
      fontFamily: "Commodore",
      fontSize: 14.5,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [commodore],
      
          body:{
            backgroundColor: 'white',
            boxShadow:"none",
            height:'100vh'
          }
        },
     
     
    },},
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#474747",
      },
    },
    shadows: ["none"],
  });
};
