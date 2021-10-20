// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let visitas:number = 0

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
            <select name="select">
              <option style={{color:'blue'}} value="value1">Blue</option>
              <option style={{color:'brown'}} value="value2">Brown</option>
              <option style={{color:'purple'}} value="value3">Purple</option>
            </select>
              
            
              
            
              
            
            
          
          
        </body>
      </html>
    ),
  });
});
app.listen({ port: 8899 });