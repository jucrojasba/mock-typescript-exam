import { loader } from "./components/loader/loader.component";
import { routes } from "./helpers/routes";
import { Routes } from "./models/routes.model";

export function Router(): void {
  const path: string = window.location.pathname;
  const publicRoute: Routes | undefined = routes.public.find(
    (r) => r.path === path
  );
  const privateRoute: Routes | undefined = routes.private.find(
    (r) => r.path === path
  );
  const token: string | null = sessionStorage.getItem("token");

  //Acceso a la ruta principal si no hay token
  if (path === "/" && !token) {
    navigateTo("/login");
    return;
  }

  //Si accede a ruta principal y hay token
  if (path == "/" && token) {
    navigateTo("/home");
    return;
  }

  //Manejo de rutas publicas
  if (publicRoute) {
    publicRoute.view();
    return;
  }

  //Menejo de ritulo privadas
  if (privateRoute) {
    if (token) {
      privateRoute.view();
      return;
    } else {
      navigateTo("/login");
      return;
    }
  }

  //Not Fund View
  if ((!publicRoute || !privateRoute) && path != "/") {
    navigateTo("/not-found");
    return;
  }
}
export function navigateTo(path: string): void {
  window.history.pushState({}, "", window.location.origin + path);
  loader(true);
  Router();
  loader(false);
}
window.addEventListener("popstate", Router);

// export checkAuth(token: string): boolean {

// }
