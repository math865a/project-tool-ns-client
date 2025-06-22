import {
    Autocomplete,
    AutocompleteCloseReason,
    Box,
    ListItemText,
    Menu,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import {
    Action as A,
    Can,
    ResourceProfile,
    ResourceTypeOption,
    Subject,
} from "~/src";
import { Action, AutoControl } from "~/src/design-system";
import { useMenuState } from "~/src/hooks/useMenu";
import { toFormData } from "~/util";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

export default function ResourceTypesEditor({
    isHovering,
}: {
    isHovering: boolean;
}) {
    const { resourcetypes, node } = useRouteLoaderData(
        "routes/app.resources_.$resourceId"
    ) as ResourceProfile;

    const resourceTypeOptions = useFetcher<ResourceTypeOption[]>();
    const createAgents = useFetcher<any>();
    const [selected, setSelected] = useState<ResourceTypeOption[]>([]);

    const theme = useTheme();

    const { handleOpen, ...menuProps } = useMenuState();

    const getOptions = () => {
        resourceTypeOptions.load("/api/resourcetype-options");
    };

    const handleSubmit = () => {
        const dtos = selected.map((s) => ({
            resourceId: node.id,
            resourcetypeId: s.id,
        }));
        createAgents.submit(toFormData(dtos), {
            action: "/api/resource-portfolio",
            method: "post",
        });
    };

    useEffect(() => {
        if (createAgents.data?.status === "ok") {
            setSelected([]);
            menuProps.onClose();
        }
    }, [createAgents?.data]);

    return (
        <>
            <Can I={A.Write} a={Subject.Resources}>
                <Can I={A.Write} a={Subject.ResourceTypes}>
                    {(isHovering || menuProps.open) && (
                        <Action.Symbol
                            icon={IconPlus}
                            onClick={(event) => {
                                handleOpen(event);
                                getOptions();
                            }}
                            symbolProps={{ color: theme.palette.success.main }}
                            title="Tilføj"
                        />
                    )}
                </Can>
            </Can>
            <Menu
                {...menuProps}
                PaperProps={{
                    sx: {
                        p: 2,
                        pb: 1,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                        minWidth: 425,
                    },
                }}
            >
                <div>
                    <Autocomplete
                        open
                        multiple
                        loading={resourceTypeOptions.state === "loading"}
                        loadingText={"loading"}
                        onClose={(
                            event: React.ChangeEvent<{}>,
                            reason: AutocompleteCloseReason
                        ) => {
                            if (reason === "escape") {
                                setSelected([]);
                                menuProps.onClose();
                            }
                        }}
                        value={selected}
                        onChange={(event, newValue, reason, details) =>
                            setSelected(newValue)
                        }
                        renderOption={(props, option, state) => (
                            <AutoControl.Option
                                props={props}
                                option={option}
                                state={state}
                                sx={{ py: 0, alignItems: "center" }}
                                key={option.id}
                            >
                                <ListItemText
                                    primary={option.name}
                                    secondary={option.contract.name}
                                    primaryTypographyProps={{ fontSize: 12 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                />
                            </AutoControl.Option>
                        )}
                        options={
                            resourceTypeOptions.data?.filter(
                                (d) =>
                                    _.find(
                                        resourcetypes,
                                        (x) => x.id === d.id
                                    ) === undefined
                            ) ?? []
                        }
                        disableCloseOnSelect
                        PopperComponent={AutoControl.Popper}
                        renderTags={() => null}
                        noOptionsText="Der er ingen ressourcer som ikke allerede er på dit team."
                        getOptionLabel={(option) => option.name}
                        sx={{
                            "& .MuiList-Root": {
                                width: 400,
                            },
                        }}
                        renderInput={(params) => (
                            <AutoControl.Header
                                title="Ressourcetyper"
                                {...params}
                            />
                        )}
                    />
                </div>
                <Box
                    flexGrow={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={1}
                >
                    <Typography fontSize={12}>
                        {selected.length + " valgte"}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Action.TextButton
                            text="Annuller"
                            icon={IconX}
                            disabled={createAgents.state === "submitting"}
                            sx={{ color: theme.palette.error.main }}
                            onClick={() => {
                                setSelected([]);
                                menuProps.onClose();
                            }}
                        />
                        <Action.TextButton
                            text="Tilføj"
                            icon={IconCheck}
                            disabled={createAgents.state === "submitting"}
                            sx={{ color: theme.palette.success.main }}
                            onClick={() => {
                                handleSubmit();
                            }}
                        />
                    </Stack>
                </Box>
            </Menu>
        </>
    );
}
