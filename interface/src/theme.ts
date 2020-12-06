import { createMuiTheme } from "@material-ui/core/styles";
import {eksell, foundersMono,foundersMedium} from './assets/fonts'

(foundersMono)
export const getTheme = () => {
  return (createMuiTheme as any)({
    typography: {
      fontFamily: "FoundersMedium",
      h6: {
        fontFamily: "Eksell"
      },
      fontSize: 14.5,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [foundersMedium,eksell],
      
          body:{
            backgroundColor: '#ffffff',
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
