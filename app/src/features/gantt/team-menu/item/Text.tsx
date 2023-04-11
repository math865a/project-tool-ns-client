import { Stack, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { TeamMember } from "gantt-models";
import { observer } from "mobx-react-lite";
import { disableInteraction } from "styles";
import { Action, Subject } from "~/src/_definitions";
import { Can } from "~/src/session-user";

const TeamMemberText = observer(
    ({ TeamMember }: { TeamMember: TeamMember }) => {
        return (
            <Stack>
                <Can I={Action.Read} a={Subject.Resources} passThrough>
                    {(allowed) => {
                        const textProps = allowed
                            ? {
                                  component: Link,
                                  to: `/app/resources/${TeamMember.resource.id}`,
                                  prefetch: "intent",
                              }
                            : {
                                style: disableInteraction as React.CSSProperties
                            };
                        return (
                         
                                <Typography
                                    fontSize={12}
                                    sx={{
                                        color: "text.primary",
                                        textDecoration: "none",
                                        cursor: allowed ? "pointer" : "default",
                                        "&:hover": {
                                            textDecoration: allowed
                                                ? "underline"
                                                : undefined,
                                        },
                                    }}
                                    {...textProps}
                                >
                                    {TeamMember.resource.name}
                                </Typography>
                          
                        );
                    }}
                </Can>
                <Can I={Action.Read} a={Subject.ResourceTypes} passThrough>
                    {(allowed) => {
                        const textProps = allowed
                            ? {
                                  component: Link,
                                  to: `/app/resourcetypes/${TeamMember.resourceType.id}`,
                                  prefetch: "intent",
                              }
                            : {
                                style: disableInteraction as React.CSSProperties
                            };;
                        return (
                      
                                <Typography
                                    mt={-0.2}
                                    fontSize={11}
                                    sx={{
                                        color: "text.secondary",
                                        textDecoration: "none",
                                        cursor: allowed ? "pointer" : "default",
                                        "&:hover": {
                                            textDecoration: allowed
                                                ? "underline"
                                                : undefined,
                                        },
                                    }}
                                    {...textProps}
                                >
                                    {TeamMember.resourceType.name}
                                </Typography>
                           
                        );
                    }}
                </Can>
            </Stack>
        );
    }
);
export default TeamMemberText;
