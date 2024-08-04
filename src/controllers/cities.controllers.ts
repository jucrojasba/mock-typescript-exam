import { CreateCity, ResponseCreateCity, ResponseWeather } from "../models/city.model";

export class CitiesController{
    
    //Create City
    async createCity(data: CreateCity): Promise<ResponseCreateCity> {
        try {
            const temperature = (await this.getWeather(data.name)).main.temp;
            const dataToCreate:ResponseCreateCity = {
                info: data,
                temperature,
            };

            const cities = JSON.parse(localStorage.getItem('cities') || '[]');

            cities.push(dataToCreate);

            localStorage.setItem('cities', JSON.stringify(cities));

            return dataToCreate;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }


    //Get Cities
    getCities(): Array<Record<string, any>> {
        const cities = JSON.parse(localStorage.getItem('cities') || '[]');
        return cities;
    }

    // Delete City
    deleteCity(name: string): boolean {
        try {
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');
            
            const updatedCities = cities.filter((city: { info: { name: string } }) => city.info.name.toLowerCase() !== name.toLowerCase());

            localStorage.setItem('cities', JSON.stringify(updatedCities));

            return cities.length !== updatedCities.length;
        } catch (error) {
            throw new Error(`Error al eliminar la ciudad ${error}`);
        }
    }

    // Update City
    async updateCity(name: string, updatedData: CreateCity): Promise<boolean> {
        try {
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');
            
            const index = cities.findIndex((city: { info: { name: string } }) => city.info.name.toLowerCase() === name.toLowerCase());

            if (index !== -1) {
                const temperature = (await this.getWeather(updatedData.name)).main.temp;

                const updatedCity = {
                    info: updatedData,
                    temperature,
                };

                cities[index] = updatedCity;

                localStorage.setItem('cities', JSON.stringify(cities));

                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(`Error al actualizar la ciudad: ${error}`);
        }
    }


    //City Weather Controller
    private async getWeather(name:string):Promise<ResponseWeather>{
        const domain: string = '/api/data/2.5/weather';
        const queryParams:string = `?q=${name.toLowerCase()}&appid=4934e44ff1d73160e5749efcbabad009`;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
          };
          const reqOptions: RequestInit = {
            method: "GET",
            headers: headers,
          };
        const url:string = domain + queryParams;
        const weatherResponse:Response = await fetch(url, reqOptions);
        if(weatherResponse.ok){
            const responseBodyWeather: ResponseWeather = await weatherResponse.json();
            return responseBodyWeather;
        }else if (weatherResponse.status == 404){
            throw new Error(`City not found, status ${weatherResponse.status}`);
        } else{
            throw new Error(`We're sorry, it seems a weather error occurred, status ${weatherResponse.status}`);
        }
    }

    //Color Temperature
    colorTemperature(temperature:number):string{
        if (temperature <= 10) {
            return 'rgb(115, 115, 232)';
        } else if (temperature > 10 && temperature <= 18) {
            return 'rgb(135, 232, 115)';
        } else if (temperature > 18 && temperature <= 25){
            return 'rgb(232, 232, 115)';
        }else {
            return 'rgb(232, 115, 115)';
        }
    }


}