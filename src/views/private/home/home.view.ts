import { loader } from "../../../components/loader/loader.component.ts";
import { navbar } from "../../../components/nabar/navbar.component.ts";
import './home.view.css'

export function homeView() {
  //Erase last page viewed & load navbar
  loader(true);
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = "";
  navbar();
  loader(false);

  //HTMLElements
  const $homeContainer = document.createElement('div') as HTMLDivElement;

  //Content


  //Classes and IDs
  $homeContainer.classList.add('home-container')

  //Jerarquia de Etiquetas HTML
  $root.appendChild($homeContainer);


}
