import { ResetPasswordDto } from '@math865a/project-tool.types';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { ActionArgs } from '@remix-run/node';
import { Link, useActionData } from '@remix-run/react';
import { sendRequest } from 'session';
import { getServiceUrl } from '~/server';

export const handle = {
    Title: () => 'Nustil adgangskode',
};

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const result = await sendRequest(request, {
        url: "http://auth-service:5001/reset-password",
        method: 'POST',
        body: {
            email: formData.get('email') as string,
        },
    });
    return result;
}

export default function ResetPassword() {
    const actionData = useActionData();

    if (actionData) {
        return (
            <Stack spacing={4} flexGrow={1}>
                <Typography>
                    Hvis den angivede mail er tilknyttet en bruger, vil du inden
                    kort til modtage et engangspassword.
                </Typography>
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    component={Link}
                    to="/auth/login"
                    sx={{
                        textTransform: 'initial',
                        fontWeight: 'bold',
                        letterSpacing: '0.05rem',
                    }}
                >
                    Tilbage
                </Button>
            </Stack>
        );
    }

    return (
        <form method="post">
            <Stack spacing={4} flexGrow={1}>
                <TextField
                    name="email"
                    type="email"
                    label="E-mail"
                />
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                        textTransform: 'initial',
                        fontWeight: 'bold',
                        letterSpacing: '0.05rem',
                    }}
                >
                    Send mig et engangspassword
                </Button>
            </Stack>
        </form>
    );
}
