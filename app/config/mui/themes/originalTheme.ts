import { createTheme } from "@mui/material/styles";

let materialTheme = createTheme({
    typography: {
        fontFamily: [
            "Poppins",
            '"Segoe UI"',
        ].join(","),
        body1: {
            fontSize: "0.9rem",
        },
        subtitle1: {
            fontSize: "0.95rem",
        },
    },
    palette: {
        background: {
            default: "#f2f2f2",
            paper: "#f9f9f9", //"#ffffff"
        },
        primary: {
            darker: "#2E3E4D",
            dark: "#33495B",
            main: "#45637a",
            light: "#6a8295",
            lighter: "#889BAA",
        },
        secondary: {
            main: "#f89838",
            dark: "#C2660A",
            light: "#fbc289",
        },
        warning: {
            main: "rgba(252, 194, 95, 0.5)",
        },
        neutral: {
            lighter: "#f9f9f9",
            light: "#f2f2f2",
            main: "#7F7F7F",
            dark: "#525252",
        },
        success: {
            main: "#197673",
        },
        info: {
            main: "#D2CBF6",
        },
        error: {
            main: "#FB3640",
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
        },
    },
    status: {
        danger: "red",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1900,
        },
    },
});

materialTheme = createTheme(materialTheme, {
    components: {
        MuiPaper: {
            defaultProps: {
                //elevation: 1
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 13,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    marginBottom: 0,
                    marginTop: 0,
                },
            },
        },
        MuiTooltip: {
            defaultProps: {
                disableInteractive: true,
            },
        },
        MuiMenu: {
            defaultProps: {
                PaperProps: {
                    sx: {
                        backgroundColor: "#fff",
                        borderRadius: 4
                    },
                },

            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "initial",
                },
            },
            variants: [
                {
                    props: { className: "pagebar" },
                    style: {
                        textTransform: "initial",
                        borderColor: "#C2C2C2",
                        borderWidth: "1px",
                        color: "#000",
                        fontWeight: 300,
                        fontSize: 12,
                        //fontSize: 14,
                        fontFamily: "Inter",
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingBottom: 2,
                        paddingTop: 2,
                        "&:hover": {
                            backgroundColor:
                                materialTheme?.palette?.grey?.[200],
                            color: "#000",
                        },
                    },
                },
                {
                    props: { className: "thin" },
                    style: {
                        textTransform: "initial",
                        minWidth: 0,
                        borderColor: "#858585",
                        borderWidth: "1px",
                        color: "#000",
                        fontWeight: 100,
                        //fontSize: 14,
                        paddingLeft: 3,
                        paddingRight: 3,
                        paddingBottom: 2,
                        paddingTop: 2,
                        "&:hover": {
                            backgroundColor:
                                materialTheme?.palette?.grey?.[200],
                            color: "#000",
                        },
                    },
                },
                {
                    props: { className: "pagebardark" },
                    style: {
                        textTransform: "initial",
                        borderColor: "#000",
                        color: "#000",
                        fontWeight: 100,
                        fontSize: 14,
                        //fontFamily: "Source Sans Pro",
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 4,
                        paddingTop: 4,
                    },
                },
                {
                    props: { className: "paperbutton" },
                    style: {
                        textTransform: "initial",
                        fontWeight: 500,
                        fontSize: 12,
                        //fontFamily: "Source Sans Pro",
                        paddingLeft: 3,
                        paddingRight: 3,
                        paddingBottom: 4,
                        paddingTop: 4,
                    },
                },
                {
                    props: { className: "blacktext" },
                    style: {
                        color: "#000",
                        borderColor: "#000",
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 13,
                        textDecoration: "underline",
                        //fontFamily: "Source Sans Pro",
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 4,
                        paddingTop: 4,
                        "&:hover": {
                            backgroundColor: "#00000066",
                            color: "#fff",
                            borderColor: "#fff",
                        },
                    },
                },
            ],
        },
        MuiIconButton: {
            variants: [
                {
                    props: { className: "pagebar" },
                    style: {
                        fontSize: 15,
                        //backgroundColor: "rgba(175, 212, 194, 0.4)",//"#F2F8F5",
                        borderRadius: 6,
                        p: 1,
                    },
                },
            ],
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                },
            },
            variants: [
                {
                    props: { className: "tiny" },
                    style: {
                        input: {
                            padding: "5.5px 2px",
                            fontSize: "11.5px",
                            textAlign: "center",
                        },
                        root: {
                            fontSize: "12px",
                        },
                    },
                },
                {
                    props: { className: "input-cell" },
                    style: {
                        input: {
                            fontSize: 12,
                            borderColor: materialTheme.palette.secondary.main,
                            borderStyle: "solid",
                            borderLeft: "none",
                            borderTop: "none",
                            borderRight: "none",
                            paddingBottom: 0,
                        },
                    },
                },
            ],
        },
        MuiSelect: {
            variants: [
                {
                    props: { className: "display-text" },
                    style: {
                        input: {
                            padding: "4px 4px",
                            fontSize: 14,
                            textAlign: "left",
                            color: materialTheme.palette.text.secondary,
                        },
                        root: {
                            fontSize: 14,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                        },
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            variants: [
                {
                    props: { className: "display-text" },
                    style: {
                        input: {
                            padding: "5.5px 12px",
                            fontSize: 13,
                            textAlign: "left",
                            color: materialTheme.palette.text.secondary,
                        },
                        root: {
                            fontSize: 13,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                            "&:disabled": {
                                borderColor: "transparent",
                   
                            },
                        },
                    
                 
                    },
                },
                {
                    props: { className: "tiny" },
                    style: {
                        input: {
                            padding: "5.5px 0px 5.5px 12px",
                            fontSize: "11.5px",
                            textAlign: "left",
                        },
                        root: {
                            fontSize: "12px",
                            paddingLeft: "2px",
                        },
                        adornedStart: {
                            paddingLeft: 0,
                        },
                        adornedEnd: {
                            paddingRight: 0,
                        },
                    },
                },
                {
                    props: { className: "supertiny" },
                    style: {
                        input: {
                            padding: "4px 1px 4px 4px",
                            fontSize: "11px",
                        },

                        adornedStart: {
                            paddingLeft: 0,
                        },
                    },
                },
                {
                    props: { className: "tinyallocation" },
                    style: {
                        input: {
                            padding: "5.5px 0px 5.5px 6px",
                            fontSize: "11.5px",
                        },
                        adornedStart: {
                            paddingLeft: 0,
                        },
                    },
                },
            ],
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: "30px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                },
            },
            variants: [
                {
                    props: { className: "tiny" },
                    style: {
                        input: {
                            padding: "5.5px 0px",
                            fontSize: "11.5px",
                        },
                        root: {
                            fontSize: "12px",
                            paddingLeft: "6px",
                        },
                        adornedStart: {
                            paddingLeft: 0,
                        },
                    },
                },
                {
                    props: { className: "supertiny" },
                    style: {
                        input: {
                            padding: "4px 1px 4px 4px",
                            fontSize: "11px",
                        },

                        adornedStart: {
                            paddingLeft: 0,
                        },
                    },
                },
                {
                    props: { className: "allocation" },
                    style: {
                        input: {
                            padding: "5.5px 0px",
                            fontSize: "11.5px",
                            textAlign: "center",
                        },
                        root: {
                            fontSize: "12px",
                            paddingLeft: "6px",
                        },
                        adornedStart: {
                            paddingLeft: 0,
                        },
                    },
                },
            ],
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    paddingTop: "1px",
                    paddingBottom: "1px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "rgba(127, 127, 127, 0.12)", //"rgba(248, 152, 56, 0.1)"//"rgba(69, 99, 122, 0.1)"
                    },
                },
            },
            variants: [
                {
                    props: { className: "actionlist" },
                    style: {
                        color: "#52665C",
                        backgroundColor: "#F4F6F4",
                        fontWeight: 500,
                        fontSize: 12,
                        fontFamily: "Source Sans Pro",
                        paddingLeft: 10,
                        paddingRight: 5,
                        paddingTop: 5,
                        paddingBottom: 5,
                        "&:hover": {
                            backgroundColor: "#E7EEEE",
                        },
                    },
                },
            ],
        },
        ListItemAvatar: {
            styleOverrides: {
                root: {
                    minWidth: "40px",
                },
            },
        },
        MuiTableCell: {
            defaultProps: {
                padding: "none",
                align: "center",
            },
            styleOverrides: {
                root: {
                    boxSizing: "border-box",
                    borderCollapse: "collapse",
                    overflowY: "hidden",
                    overflowX: "hidden",
                    paddingTop: 0,
                    paddingBottom: 0,
                    cursor: "default",
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                head: {
                    borderBottom: "0.75px solid rgba(224, 224, 224, 1)",
                },
            },
        },
    },
});
/*
materialTheme = responsiveFontSizes(materialTheme, {
    breakpoints: ["xs", "sm", "md", "lg", "xl", "xxl"],
    factor: 2
})*/

export default materialTheme;
