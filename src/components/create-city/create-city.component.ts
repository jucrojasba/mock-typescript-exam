import { CitiesController } from "../../controllers/cities.controllers";
import { getTodayDate } from "../../helpers/getTodayDate";
import { capitalizeFirstLetter } from "../../helpers/string-helpers";
import { CreateCity, ResponseCreateCity } from "../../models/city.model";
import { loader } from "../loader/loader.component";
import { showModal } from "../modals/modal.component";
import "./create-book.component.css";

export function createCity() {
    //HTML Element of Modal
    const $modalContainer = document.createElement('div');
    $modalContainer.id = 'modal-container';
    $modalContainer.className = 'modal-container';
    $modalContainer.style.display = 'none';
  
    const $modalContent = document.createElement('div');
    $modalContent.className = 'modal-content';
  
    const $closeButton = document.createElement('span');
    $closeButton.className = 'close-button';
    $closeButton.id = 'close-button';
    $closeButton.innerHTML = '&times;';
  
    const $modalMessage = document.createElement('div');
    $modalMessage.id = 'modal-message';
    
    //Jerarquia of Modal
    $modalContent.appendChild($closeButton);
    $modalContent.appendChild($modalMessage);
    $modalContainer.appendChild($modalContent);
    
    //Display Modal when click on it.
    const $root = document.getElementById("root") as HTMLElement;
    $root.appendChild($modalContainer);
  

    // Logic to post
    if ($modalContainer && $modalMessage && $closeButton) {
      const $createForm = document.createElement('form');
      $createForm.id = 'create-form';

      //HTML Input Elements 
      const $cityName = document.createElement('input');
      $cityName.type = 'text';
      $cityName.name = 'city';
      $cityName.id = 'city';
      $cityName.placeholder = 'Enter a new city name';
      $cityName.maxLength = 20;
  
      const $country = document.createElement('input');
      $country.type = 'text';
      $country.name = 'country';
      $country.id = 'country';
      $country.placeholder = 'Enter the country';
      $country.maxLength = 20;
  
      const $reason = document.createElement('input');
      $reason.type = 'text';
      $reason.name = 'reason';
      $reason.id = 'reason';
      $reason.placeholder = 'Enter a reason to explore weather';
      $reason.maxLength = 20;
  
     
      //Buttons Form
      const $actionButtons = document.createElement('div');
      $actionButtons.className = 'action-buttons-create';
  
      const $createButton = document.createElement('button');
      $createButton.type = 'submit';
      $createButton.id = 'create';
      $createButton.textContent = 'Create';
  
      const $cancelButton = document.createElement('button');
      $cancelButton.id = 'cancel';
      $cancelButton.type = 'button';
      $cancelButton.textContent = 'Cancel';
  
      $actionButtons.appendChild($createButton);
      $actionButtons.appendChild($cancelButton);


      //Jerarquia de etiquetas HTML del formulario
      $createForm.appendChild($cityName);
      $createForm.appendChild($country);
      $createForm.appendChild($reason);
      $createForm.appendChild($actionButtons);
  
      $modalMessage.appendChild($createForm);
    
      //Events
      $modalContainer.style.display = "flex";
  
      $cancelButton.onclick = () => {
        $modalContainer.style.display = "none";
      };
  
      $closeButton.onclick = () => {
        $modalContainer.style.display = "none";
      };
  
      window.onclick = (event) => {
        if (event.target === $modalContainer) {
          $modalContainer.style.display = "none";
        }
      };

    //Logic to Post Request
    //Instantiate City
    const city:CitiesController=new CitiesController();

    $createForm.addEventListener('submit',async(e) => {
        e.preventDefault();
        if($cityName.value && $country.value && $reason.value){
        //Data to create city
        const dataToCreate:CreateCity={
            name:`${$cityName.value}`,
            country: `${$country.value}`,
            createdAt: `${getTodayDate()}`,
            reason:`${$reason.value}`
        }
        try {
            loader(true);
            const responsePost:ResponseCreateCity = await city.createCity(dataToCreate);
            loader(false);
            if(responsePost){
            window.location.reload();
            showModal(`${capitalizeFirstLetter(responsePost.info.name)} created successfully`);
            }
        } catch (error) {
            loader(false);
            showModal(`${error}`);
        }
        }else{
        showModal("Please fill in all fields");
        throw new Error("Please fill in all fields");
        }
    });

    }
  }
  