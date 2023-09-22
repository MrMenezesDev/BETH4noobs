import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from 'typed-html';

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <HtmlBase>
        <body class="flex w-full h-screen justify-center items-center">
          <BotaoContador contador={0} />
        </body>
      </HtmlBase>
    ))
  .get("/clicado/:contador", ({ params: { contador } }) => {
    const contadorAtual = Number(contador) + 1;
    return (
      <BotaoContador contador={contadorAtual} />
    );
  })
  .listen(3000);

console.log(`Estou escutando na endereço http:/${app.server?.hostname}:${app.server?.port}`);

const BotaoContador = ({ contador }: { contador: number }) => `
<button 
  class="font-bold hover:bg-white hover:text-indigo-500"
  hx-get="/clicado/${contador}" hx-swap="outerHTML">
  Fui clicado ${contador} vezes
</button>
`;


const HtmlBase = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <title> BETH 4noobs </title>
    <script src="https://unpkg.com/htmx.org@latest"></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
 ${children}
</html>
`;
