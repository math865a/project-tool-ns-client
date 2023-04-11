import { disableInteraction } from  "~/styles";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import { Activity, TeamMember } from "gantt-models";
import _ from "lodash";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";
import AllocationConsequence from "./AllocationConsequence";

const ConsequencesBody = observer(
    ({ TeamMember }: { TeamMember: TeamMember }) => {

        const AllocationDeliveries = computed(() => {
            return _.map(_.sortBy(TeamMember.Deliveries as Activity[], d => d.sequence), (d) => ({
                Delivery: d,
                Allocations: _.filter(
                    TeamMember.Allocations,
                    (x) => x.Assignment?.Task?.Parent === d
                ),
            }));
        });

        return (
            <List dense sx={disableInteraction}>
                {AllocationDeliveries.get().map(({ Delivery, Allocations }, index) => (
                    <>
                        <ListItem key={Delivery.id}>
                            <ListItemIcon>
                                <Typography fontSize={12} fontWeight="bold">    
                                    {Delivery.wbs}
                                </Typography>
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}
                                secondaryTypographyProps={{
                                    fontSize: 12,
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxWidth: "80%",
                                }}
                                primary={Delivery.name}
                                secondary="Leverance"
                            />
                            <ListItemSecondaryAction>
                                <Typography fontSize={12} fontWeight="bold">
                                    {_.sumBy(Allocations, d => d.totalHours) + " timer"}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <List sx={{ pl: 3, paddingTop: 0 }} dense key={Delivery.id + "-allocations"}>
                            {Allocations.map((a) => (
                                <AllocationConsequence
                                    key={a.id}
                                    Allocation={a}
                                />
                            ))}
                        </List>
                        {index !== AllocationDeliveries.get().length -1 && <ListItem divider disablePadding  sx={{
                              mb:1
                                }}/>}
                    </>
                ))}
            </List>
        );
    }
);

export default ConsequencesBody;

/*<ListItem key={TeamMember.id}>
                    <ListItemText
                        primaryTypographyProps={{
                            fontSize: 12,
                            fontWeight: "bold",
                        }}
                        secondaryTypographyProps={{
                            fontSize: 12,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            maxWidth: "80%",
                        }}
                        primary={node.systematicName}
                        secondary={node.name}
                    />
                    <ListItemSecondaryAction>
                        <Typography fontSize={12} fontWeight="bold">
                            {TeamMember.workHours + " timer"}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>

                <List sx={{ pl: 6 }}>
                    {TeamMember.Allocations.map((a) => (
                        <AllocationConsequence key={a.id} Allocation={a} />
                    ))}
                </List>
            </List>*/
