import { routes } from "./helpers/routes";
import { Routes } from "./models/routes.model";

export function Router(): void {
  const path: string = window.location.pathname;
  const publicRoute: Routes | undefined = routes.public.find(
    (r) => r.path === path
  );
  const token: string | null = sessionStorage.getItem("token");

  //Acceso a la ruta principal
  if (path === "/") {
    navigateTo("/not-found");
    return;
  }

  //Manejo de rutas publicas
  if (publicRoute) {
    publicRoute.view();
    return;
  }

  //Menejo de ritulo privadas
  if (token) {
    console.log("Hay token");
    return;
  }

  //Not Fund View
  if (!publicRoute && path != "/") {
    navigateTo("/not-found");
    return;
  }
}
export function navigateTo(path: string): void {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
window.addEventListener("popstate", Router);
