import "babel-polyfill";
import { resolve } from "path";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import serve from "koa-static";
import logger from "koa-logger";
import mongoose from "mongoose";

import routes from "./routes";

async function connectMongo() {
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", console.error.bind(console, "连接数据库失败"));
  return await mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });
}

connectMongo().then(() => {
  const app = new Koa();

  app.use(logger());
  app.use(bodyParser());
  app.keys = ["davinci"];
  app.use(
    session(
      {
        key: "koa:sess",
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
      },
      app
    )
  );
  app.use(serve(resolve(__dirname, "../static")));
  routes(app);
  app.listen(8080, () => console.log("Server is running on 8080"));
});
