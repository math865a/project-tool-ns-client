import "@mui/material/styles";
declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: React.CSSProperties["color"];
        };
    }

    interface Palette {
        neutral: Palette["primary"];
    }
    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }

    interface PaletteColor {
        lighter?: string;
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        lighter?: string;
        darker?: string;
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties["color"];
        };
    }


    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true
      }
}
