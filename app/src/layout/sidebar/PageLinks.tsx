import _ from "lodash";
import { Action, Can, Subject, useSession } from "~/src";
import { Directory } from "~/src/design-system";
import SidebarItem from "./SidebarItem";
import { pageMap } from "./_page-map";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function PageLinks() {
    const { user } = useSession();

    return (
        <Directory.Wrapper sx={{ px: 2, mt: 2 }}>
            <>
                {user.isResource && (
                    <SidebarItem
                        to="/app/schedule"
                        icon={IconCalendarEvent}
                        subject="Mit skema"
                        space
                    />
                )}
                {_.map(_.keys(pageMap), (subject: Subject) => {
                    return (
                        <Can I={Action.Read} a={subject} key={subject}>
                            <SidebarItem
                                {...pageMap[subject]}
                                subject={subject}
                            />
                        </Can>
                    );
                })}
            </>
        </Directory.Wrapper>
    );
}
