import { screen } from "@testing-library/react";
import { server } from "../../mocks/server";
import { render } from "../../test-utils";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";
import { MENSAJE_CARGANDO, NOMBRE_INVALIDO, NO_ENCONTRADO } from "./constants";
import { API_URL } from "../../app/constants";
import { rest } from "msw";

beforeAll(() => server.listen()); 
afterEach(() => server.resetHandlers()); 
afterAll(() => server.close());

describe("Componente Cita", () => {
    it("debería mostrar la cita por defecto", () => {
        render(<Cita />);
        expect(screen.getByText(NO_ENCONTRADO)).toBeInTheDocument();
    });

    it("debería mostrar 'CARGANDO...' al hacer clic en el botón de cita aleatoria", async () => {
        render(<Cita />);
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(await screen.findByText(MENSAJE_CARGANDO)).toBeInTheDocument();
    });

    it("debería mostrar 'CARGANDO...' al hacer clic en el botón de cita de personaje", async () => {
        render(<Cita />);
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        userEvent.type(input, "Bart Simpson");
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(await screen.findByText(MENSAJE_CARGANDO)).toBeInTheDocument();
    });

    it("debería mostrar la cita del personaje al hacer clic en el botón con un valor válido", async () => {
        server.use(
            rest.get(`${API_URL}`, (_req, res, ctx) => {
                return res(
                    ctx.json([
                        {
                            quote: "You're turning me into a criminal when all I want to be is a petty thug.",
                            character: "Bart Simpson",
                        },
                    ])
                );
            })
        );

        render(<Cita />);
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        userEvent.type(input, "Bart Simpson");
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(
            await screen.findByText("You're turning me into a criminal when all I want to be is a petty thug.")
        ).toBeInTheDocument();
        expect(screen.queryByText(NO_ENCONTRADO)).not.toBeInTheDocument();
    });

    it("debería mostrar una cita aleatoria al hacer clic en el botón sin valor de entrada", async () => {
        server.use(
            rest.get(`${API_URL}`, (_req, res, ctx) => {
                return res(ctx.json([{ quote: "Thank you. Come again." }]));
            })
        );

        render(<Cita />);
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(
            await screen.findByText("Thank you. Come again.")
        ).toBeInTheDocument();
        expect(screen.queryByText(NO_ENCONTRADO)).not.toBeInTheDocument();
    });

    it("debería mostrar un error cuando no se encuentra el nombre del personaje", async () => {
        server.use(
            rest.get(`${API_URL}`, (_req, res, ctx) => {
                return res(
                    ctx.status(404),
                    ctx.json({ error: "Por favor ingrese un nombre válido" })
                );
            })
        );

        render(<Cita />);
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        userEvent.type(input, "Bender");
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(await screen.findByText(NOMBRE_INVALIDO)).toBeInTheDocument();
    });

    it("debería mostrar un error con una entrada inválida", async () => {
        server.use(
            rest.get(`${API_URL}`, (_req, res, ctx) => {
                return res(
                    ctx.status(404),
                    ctx.json({ error: "Por favor ingrese un nombre válido" })
                );
            })
        );

        render(<Cita />);
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        userEvent.type(input, "1");
        userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(await screen.findByText(NOMBRE_INVALIDO)).toBeInTheDocument();
    });
});