import { User } from "../models";

export default function(router) {
  router.post("/api/signin", async (ctx, next) => {
    let { email, password } = ctx.request.body;

    ctx.body = await User.login(ctx, email, password);
  });

  router.post("/api/signup", async (ctx, next) => {
    let { username, email, password, repassword } = ctx.request.body;

    if (password !== repassword) {
      ctx.body = { ok: false, msg: "两次密码不一致", user: null };
    } else {
      let user = new User({
        username,
        email,
        password
      });

      ctx.body = await User.add(ctx, user);
    }
  });

  router.get("/api/user", (ctx, next) => {
    if (ctx.session.user) {
      ctx.body = { ok: true, user: ctx.session.user };
    } else {
      ctx.body = { ok: false, user: null };
    }
  });

  router.get("/api/logout", (ctx, next) => {
    delete ctx.session.user;
    ctx.body = { ok: true, msg: "退出成功" };
  });
}
