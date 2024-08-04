import { showConfirmation } from "../../../components/confirmations/confirmation.component.ts";
import { createDeleteButton } from "../../../components/deleteButton/delete-button.component.ts";
import { createEditButton } from "../../../components/editButton/edit-button.component.ts";
import { loader } from "../../../components/loader/loader.component.ts";
import { showModal } from "../../../components/modals/modal.component.ts";
import { navbar } from "../../../components/navbar/navbar.component.ts";
import { CitiesController } from "../../../controllers/cities.controllers.ts";
import { capitalizeFirstLetter } from "../../../helpers/string-helpers.ts";
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
  const $homeTitle = document.createElement('h1') as HTMLHeadingElement;
  const $paragraphNoCities = document.createElement('p') as HTMLParagraphElement;
  const $citiesContainer = document.createElement('div') as HTMLDivElement;
  
  //Content
  $homeTitle.innerText='Your Local Cities'
  $paragraphNoCities.innerText='First, create a new city in upper bar.'


  //Classes and IDs
  $homeContainer.classList.add('home-container');
  $paragraphNoCities.setAttribute('id','paragraph-no-cities');
  $citiesContainer.classList.add('cities-container')


  //Jerarquia de Etiquetas HTML
  $root.appendChild($homeContainer);
  $homeContainer.appendChild($homeTitle);
  $homeContainer.appendChild($citiesContainer);


  //Eventos
  //Instantiate
  const cities: CitiesController = new CitiesController();
  
  //First loade Local Storage
  if(cities.getCities().length === 0){
    $homeContainer.appendChild($paragraphNoCities);
  }else{
    $paragraphNoCities.remove();
    const citiesCard:Array<Record<string, any>>|[] = cities.getCities();
    citiesCard.forEach((city)=>{
      //Create HTML Elements
      const $cityCard = document.createElement('div') as HTMLDivElement;
      const $cityName = document.createElement('h2') as HTMLHeadingElement;
      const $country = document.createElement('h4') as HTMLHeadingElement;
      const $infoContainer = document.createElement('div') as HTMLDivElement;
      const $reason = document.createElement('p') as HTMLParagraphElement;
      const $createdAt = document.createElement('p') as HTMLParagraphElement;
      const $temperatureContainer = document.createElement('div') as HTMLDivElement;
      const $temperature = document.createElement('h4') as HTMLHeadingElement;

      //Classes an IDs
      $cityCard.classList.add('city-card');
      $infoContainer.classList.add('info-container');
      $temperatureContainer.classList.add('temperature-container');
      $createdAt.classList.add('bottom-card-text');

      //Jerarquia de la city card
      $citiesContainer.appendChild($cityCard);
      $cityCard.appendChild($cityName);
      $cityCard.appendChild($country);
      $cityCard.appendChild($infoContainer);
      $infoContainer.appendChild($temperatureContainer);
      $infoContainer.appendChild($reason);
      $temperatureContainer.appendChild($temperature);
      $cityCard.appendChild($createdAt);
      $cityCard.appendChild(createDeleteButton(city.info.name));
      $cityCard.appendChild(createEditButton(city.info.name));

      //Content
      $cityName.innerText= `${capitalizeFirstLetter(city.info.name)}`;
      $country.innerText=`${capitalizeFirstLetter(city.info.country)}`;
      $temperature.innerText=`${Math.floor(city.temperature - 273.15)} °C`;
      $reason.innerText=`${capitalizeFirstLetter(city.info.reason)}`;
      $createdAt.innerText=`Created at ${city.info.createdAt}`;

      //Logic for color in div temperature
      $temperatureContainer.style.backgroundColor=`${cities.colorTemperature((city.temperature)-273.15)}`;
    });

    //Delete City
    document.querySelectorAll('#delete-button').forEach(button=>{
      button.addEventListener('click',async()=>{
        const nameCity = button.getAttribute('deleteid');
        if(nameCity){
          const userResponse = await showConfirmation(`Are you sure to delete ${capitalizeFirstLetter(nameCity)}`);

          if(userResponse){
            try {
              loader(true);
              cities.deleteCity(nameCity);
              loader(false);
              showModal(`${capitalizeFirstLetter(nameCity)} was deleted succesfully`);
              window.location.reload();
            } catch (error) {
              showModal(`${error}`)
            }
          }
        }else{
          showModal('City was not founded')
        }
      })
    })
    
    //Update City
  }
}
