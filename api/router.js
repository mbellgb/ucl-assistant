const Router = require("koa-router");
const oauth = require("./oauth");
const { jwt } = require("./middleware/auth");
const UCLApiRouter = require("./uclapi/router");

module.exports = app => {
  const router = new Router();

  router.get("/", async ctx => {
    ctx.query.pretty = true;
    ctx.body = {
      routes: {
        "/session": "Returns the currently authenticated user's session",
        "/connect/uclapi": "Authorise via the UCL API",
        "/connect/uclapi/callback": "Callback from the UCL API",
        "/user": "Get information about the currently authenticated user.",
        "/timetable": {
          description: "Return the timetable for the current user.",
          parameters: {
            date: "filter by date.",
          },
        },
      },
      tips: {
        "pretty-print": "Add ?pretty=true to pretty print the json (as shown)",
      },
      version: ctx.version,
    };
  });

  // import and use the OAuth router.
  oauth(router);

  router.get("/testauth", jwt, async ctx => {
    ctx.body = "Authenticated!";
  });

  // import and use the UCL API router.
  UCLApiRouter(app);

  // route not found.
  router.get(/.*/, async ctx => {
    ctx.throw(404, "Not found");
  });

  app.use(router.routes()).use(router.allowedMethods());
};