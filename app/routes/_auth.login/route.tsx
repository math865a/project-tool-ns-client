import { Button, Stack, TextField, Typography } from "@mui/material";
import { ActionArgs, json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { createSession, sendRequest } from "../../session.server";
import { safeRedirect } from "../../util/safeRedirect";
import { getServiceUrl } from "~/server";
import { JwtHeader } from "~/src";

export const handle = {
    Title: () => "Log Ind",
};

export let action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();

    try {
        const result = await sendRequest<JwtHeader>(request, {
            url: getServiceUrl("authentication", "login"),
            method: "POST",
            body: {
                username: formData.get("email"),
                password: formData.get("password"),
            },
        });

        return await createSession({
            request,
            jwtToken: result,
            redirectTo: safeRedirect(
                new URL(request.url).searchParams.get("redirectTo"),
                "/app"
            ),
        });
    } catch (e: any) {
        console.log(e);
        return json(e);
    }
};

export default function Login() {
    const actionData = useActionData<any>();

    return (
        <form method="post">
            <Stack spacing={4} flexGrow={1}>
                {actionData && (
                    <Typography
                        sx={{ color: (theme) => theme.palette.error.main }}
                    >
                        {actionData.message}
                    </Typography>
                )}

                <TextField
                    name="email"
                    fullWidth
                    type="text"
                    autoComplete="off"
                    label="E-mail"
                />

                <TextField
                    name="password"
                    type="password"
                    label="Adgangskode"
                />

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                        textTransform: "initial",
                        fontWeight: "bold",
                        letterSpacing: "0.05rem",
                    }}
                >
                    Log Ind
                </Button>
                <Typography component={Link} to="/forgot-password">
                    Har du glemt dit password?
                </Typography>
            </Stack>
        </form>
    );
}
