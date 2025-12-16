import { Hono } from "hono";
import { scrapApiPangan } from "./scrapper";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Api siap!",
    success: true,
  });
});

app.get("/list-komoditas", async (c) => {
  try {
    const page = Number(c.req.query("page") ?? 1);
    const limit = Number(c.req.query("limit") ?? 10);
    const order = (c.req.query("order") ?? "asc") as "asc" | "desc";
    const order_by = c.req.query("order_by") ?? "name";
    const search = c.req.query("search") ?? "";

    if (Number.isNaN(page) || Number.isNaN(limit)) {
      return c.json(
        { success: false, message: "page dan limit harus angka" },
        400
      );
    }

    const result = await scrapApiPangan(page, limit, order, order_by, search);
    return c.json(result);
  } catch (err: any) {
    return err;
  }
});

export default app;
