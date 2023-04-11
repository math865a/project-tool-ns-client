import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import * as React from "react";

interface GridCellExpandProps {
    value: string;
    width: number;
    colDef: GridColDef;
}

function isOverflown(element: Element): boolean {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps
) {
    const { width, value, colDef } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
                setShowFullCell(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: "center",
                lineHeight: "24px",
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: "100%",
                    width,
                    display: "block",
                    position: "absolute",
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexGrow: 1,
                    display: "flex",
                    justifyContent:
                        colDef.align === "center"
                            ? "center"
                            : colDef.align === "left"
                            ? "flex-start"
                            : "flex-end",
                }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{
                        maxWidth: width,
                        width: "max-content",
                        marginLeft: -17
                    }}
                    sx={{           zIndex: theme => theme.zIndex.tooltip}}
                >
                    <Paper
                        elevation={12}
                        //style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            p: 1.5,
                            zIndex: theme => theme.zIndex.tooltip
                        }}
                    >
                        <Typography variant="body2" fontSize={12}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

export function renderCellExpand(params: GridRenderCellParams<any>) {
    return (
        <GridCellExpand
            value={
                params.formattedValue
                    ? params.formattedValue
                    : params.value || ""
            }
            width={Math.max(params.colDef.computedWidth, 125)}
            colDef={params.colDef}
        />
    );
}
