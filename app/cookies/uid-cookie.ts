import { createCookie } from "@remix-run/node";
import {Duration as dur} from "luxon"

export const uidCookie = createCookie("uid", {
    maxAge: dur.fromObject({days: 7}).toMillis()
})