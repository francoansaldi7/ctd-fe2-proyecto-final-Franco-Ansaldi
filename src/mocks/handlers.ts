import { rest } from "msw";
import { API_URL } from "../app/constants";

export const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
        const character = req.url.searchParams.get("character");
        if (character === "Bart Simpson") {
            return res(
                ctx.json([
                    {
                        quote:
                            "You're turning me into a criminal when all I want to be is a petty thug.",
                        character: "Bart Simpson",
                    },
                ])
            );
        } else if (character === "Bender") {
            return res(
                ctx.status(404),
                ctx.json({ error: "Por favor ingrese un nombre válido" })
            );
        } else {
            return res(ctx.json([{ quote: "Thank you. Come again." }]));
        }
    }),
];
