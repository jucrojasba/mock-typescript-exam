import { loader } from "../../../components/loader/loader.component.ts";
import { navbar } from "../../../components/nabar/navbar.component.ts";

export function homeView() {
  //Erase last page viewed
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = "";

  //Cargar navBar al inicio del HTML
  loader(true);
  navbar();
  loader(false);


}
