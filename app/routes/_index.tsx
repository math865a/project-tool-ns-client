import { LoaderArgs, redirect } from '@remix-run/node';
import { getSession } from '../session.server';

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request);

    if (session?.has('access_token')) {
        return redirect('/app');
    } else {
        return redirect("/login")
    }
}

export default function Index() {
    return null;
}
