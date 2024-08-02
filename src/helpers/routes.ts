import { Routes } from "../models/routes.model";
import { notFoundView } from "../views/public/not-found/not-found.view";

export const routes: Record<string, Array<Routes>> = {
  public: [{ path: "/not-found", view: notFoundView }],
};
