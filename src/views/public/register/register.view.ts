import { showConfirmation } from "../../../components/confirmations/confirmation.component";
import { loader } from "../../../components/loader/loader.component";
import { showModal } from "../../../components/modals/modal.component";
import { UserController } from "../../../controllers/user.controller";
import { RequestAuth } from "../../../models/user.model";
import { navigateTo } from "../../../router";
import "./register.view.css";

export function registerView(): void {
  //Elementos HTML
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = "";
  const $rootContainerRegister = document.createElement(
    "div"
  ) as HTMLDivElement;
  const $formRegister = document.createElement("form") as HTMLFormElement;
  const $h1Register = document.createElement("h1") as HTMLHeadingElement;
  const $inputEmail = document.createElement("input") as HTMLInputElement;
  const $inputPassword = document.createElement("input") as HTMLInputElement;
  const $inputConfirmPassword = document.createElement(
    "input"
  ) as HTMLInputElement;
  const $actionButtons = document.createElement("div") as HTMLDivElement;
  const $buttonLogin = document.createElement("button") as HTMLButtonElement;
  const $buttonRegister = document.createElement("button") as HTMLButtonElement;

  //Classes && IDs
  $rootContainerRegister.classList.add("root-container-register");
  $formRegister.classList.add("form-register");
  $inputEmail.setAttribute("type", "email");
  $inputEmail.setAttribute("placeholder", "Enter your email");
  $inputPassword.setAttribute("type", "password");
  $inputPassword.setAttribute("placeholder", "Enter your password");
  $inputConfirmPassword.setAttribute("type", "password");
  $inputConfirmPassword.setAttribute("placeholder", "Confirm your password");
  $actionButtons.classList.add("action-buttons");
  $buttonRegister.setAttribute("id", "login-button");
  $buttonRegister.setAttribute("type", "submit");
  $buttonLogin.setAttribute("id", "register-button");

  //Jerarquia de Etiquetas HTML
  $root.appendChild($rootContainerRegister);
  $rootContainerRegister.appendChild($formRegister);
  $formRegister.appendChild($h1Register);
  $formRegister.appendChild($inputEmail);
  $formRegister.appendChild($inputPassword);
  $formRegister.appendChild($inputConfirmPassword);
  $formRegister.appendChild($actionButtons);
  $actionButtons.appendChild($buttonRegister);
  $actionButtons.appendChild($buttonLogin);

  //Contenido
  $h1Register.textContent = "Register";
  $buttonRegister.textContent = "Register";
  $buttonLogin.textContent = "I already have an account";

  //Instanciar Usuario
  const userLogin = new UserController("", "/register");

  //Eventos
  //Logica para Register
  $formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      $inputEmail.value &&
      $inputPassword.value &&
      $inputConfirmPassword.value
    ) {
      if ($inputPassword.value === $inputConfirmPassword.value) {
        const dataToRegister: RequestAuth = {
          email: $inputEmail.value,
          password: $inputPassword.value,
        };
        try {
          loader(true);
          const responseRegister = await userLogin.postRegister(dataToRegister);
          loader(false);
          const response = await showConfirmation(
            `User registered sucessfully, \nDo you want to Login?`
          );
          if (response.valueOf()) {
            navigateTo("/login");
          }
          console.log(responseRegister.id);
        } catch (error) {
          loader(false);
          showModal(`${error}`);
        }
      } else {
        showModal(
          "Passwords do not match. Please enter the same password in both fields."
        );
        return;
      }
    } else {
      showModal("Please fill all the fields");
      return;
    }
  });

  //Evento para navegar a Login
  $buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/login");
  });
}
