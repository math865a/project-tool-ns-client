import { createContext, useContext } from "react";
import { Child, Feedback } from "~/src/design-system";
import { FormResponse } from "~/src";

const Context = createContext<
    | {
          notify: ReturnType<typeof Feedback.useInform>["inform"];
          notifyResponse: (response: FormResponse) => void;
      }
    | undefined
>(undefined);

export default function NotificationsProvider({
    children,
}: {
    children: Child | Child[];
}) {
    const { inform, informProps } = Feedback.useInform();

    const notifyResponse = (response: FormResponse) => {
        const color = response.status === "ok" ? "success" : "error";
        if (response.message) {
            inform(response.message, color);
        }
    };

    return (
        <Context.Provider value={{ notify: inform, notifyResponse }}>
            {children}
            <Feedback.Inform {...informProps} />
        </Context.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error(
            "useNotifications must be used within a NotificationsProvider"
        );
    }
    return context;
};
