import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { faCheck, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Stack,
    useTheme,
} from "@mui/material";
import {
    useLoaderData,
    useNavigate,
    useParams
} from "@remix-run/react";
import { Allocation } from "gantt-models";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import invariant from "tiny-invariant";
import { useWorkpackage } from "useWorkpackage";
import { Action as A, Subject } from "~/src/_definitions";
import { Action, ConfirmationDialog } from "~/src/design-system";
import { Can } from "~/src/session-user";
import { Title } from "./Title";
import IntervalControl from "./controls/IntervalControl";
import { TeamMemberControl } from "./controls/TeamMemberControl";
import { WorkControl } from "./controls/WorkControl";
import { schema } from "./definitions/schema";
import { EditValues } from "./definitions/types";

export const AllocationDialog = observer(() => {
    const {
        Gantt,
        inform,
    } = useWorkpackage();
    const data = useLoaderData<EditValues>();

    const AllotmentStore = Gantt.AllotmentStore
    const navigate = useNavigate();

    const { workpackageId } = useParams();
    invariant(workpackageId);

    const methods = useForm({
        defaultValues: data as EditValues,
        resolver: yupResolver(schema),
    });

    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

    const handleSave = (values: EditValues) => {
        const isDirty = !_.isEqual(methods.getValues(), data);
        if (isDirty) {
            AllotmentStore.updateAllocation(Allocation, values);
            inform("Ændringerne blev gemt", "success");
        }
        goBack();
    };

    const handleDelete = () => {
        AllotmentStore.deleteAllocation(Allocation);

        inform("Allokeringen blev slettet", "success");
        goBack();
    };

    const handleClose = () => {
        const isDirty = !_.isEqual(methods.getValues(), data);
        if (isDirty) {
            setLeaveDialogOpen(true);
        } else {
            goBack();
        }
    };

    const goBack = () => {
        setLeaveDialogOpen(false);
        navigate(`/app/workpackages/${Gantt.workpackageId}/gantt`);
    };

    const Allocation = useMemo(() => {
        return AllotmentStore.Allocations.find(
            (d) => d.id === data.id
        ) as Allocation;
    }, [data.id]);

    const theme = useTheme();

    return (
        <>
            <Dialog
                open
                onClose={handleClose}
                PaperProps={{
                    sx: { borderRadius: 4, p: 1 },
                }}
                fullWidth
                maxWidth="sm"
            >
                <FormProvider {...methods}>
                    <Can
                        I={A.Write}
                        a={Subject.Workpackages}
                        passThrough
                    >
                        {(allowed) => (
                            <form
                                style={{ width: "100%" }}
                                onSubmit={
                                    allowed
                                        ? methods.handleSubmit(handleSave)
                                        : undefined
                                }
                            >
                                <Title
                                    Allocation={Allocation}
                                    handleClose={handleClose}
                                />
                                <DialogContent>
                                    <Divider />
                                    <TeamMemberControl />
                                    <Stack spacing={4}>
                                        <Divider />
                                        <WorkControl allowed={allowed} />
                                        <IntervalControl
                                            allowed={allowed}
                                            Allocation={Allocation}
                                        />
                                    </Stack>
                                </DialogContent>
                                <DialogActions>
                                    <Box
                                        flexGrow={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        px={2}
                                    >
                                        <Action.TextButton
                                            text="Slet"
                                            disabled={!allowed}
                                            icon={faTrash}
                                            onClick={handleDelete}
                                        />
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            {methods.formState.isDirty && (
                                                <>
                                                    <Action.TextButton
                                                        text="Ryd ændringer"
                                                        disabled={
                                                            !methods.formState
                                                                .isDirty ||
                                                            !allowed
                                                        }
                                                        icon={faTimes}
                                                        symbolProps={{
                                                            color: theme.palette
                                                                .error.main,
                                                        }}
                                                        onClick={() =>
                                                            methods.reset()
                                                        }
                                                    />
                                                    <Action.TextButton
                                                        disabled={
                                                            !methods.formState
                                                                .isDirty ||
                                                            !allowed
                                                        }
                                                        text="Gem ændringer"
                                                        type="submit"
                                                        icon={faCheck}
                                                        symbolProps={{
                                                            color: theme.palette
                                                                .success.main,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Stack>
                                    </Box>
                                </DialogActions>
                            </form>
                        )}
                    </Can>
                </FormProvider>
                <ConfirmationDialog
                    title="Gem ændringer?"
                    text="Du har ikke gemt dine ændringer. Vil du fortsætte uden at gemme?"
                    open={leaveDialogOpen}
                    onConfirm={goBack}
                    onCancel={() => setLeaveDialogOpen(false)}
                    confirmText="Gem ikke"
                    cancelVariant="outlined"
                    confirmVariant="contained"
                />
            </Dialog>
        </>
    );
});

export default AllocationDialog;
