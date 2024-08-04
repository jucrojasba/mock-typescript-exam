import { UserController } from "../../controllers/user.controller";
import { navigateTo } from "../../router";
import { createCity } from "../create-city/create-city.component";
import { loader } from "../loader/loader.component";
import './navbar.component.css'

export function navbar():void{
    //HTML Elements
    const $root = document.getElementById('root');
    const $upperBar = document.createElement('div') as HTMLDivElement;
    const $logo = document.createElement('h1') as HTMLHeadingElement;
    const $navBar = document.createElement('nav') as HTMLElement;
    const $ul = document.createElement('ul') as HTMLUListElement;
    const $home = document.createElement('li') as HTMLLIElement;
    const $createCity = document.createElement('li') as HTMLLIElement;
    const $logout = document.createElement('li') as HTMLLIElement;
    
    //Classes & IDs
    $upperBar.classList.add("upper-bar");

    //Jerarquía de las etiquetas HTML
    $root?.appendChild($upperBar);
    $upperBar.appendChild($logo);
    $upperBar.appendChild($navBar);
    $navBar.appendChild($ul);
    $ul.appendChild($home);
    $ul.appendChild($createCity);
    $ul.appendChild($logout);

    //Content
    $home.innerText='Home';
    $createCity.innerText='Create City';
    $logout.innerText='Logout';
    $logo.innerHTML=`<img id="logo-navBar">Weather Seeder`

    //Eventos
    //Instanciate City
    const user:UserController = new UserController();

    //Navigate to home
    $home.addEventListener('click', (e)=>{
        e.preventDefault();
        navigateTo('/home');
    });

    //Create City
    $createCity.addEventListener('click',()=>{
        createCity();
    })

    //Logout
    $logout.addEventListener('click',()=>{
        loader(true);
        user.logout();
        loader(false);
    })

}