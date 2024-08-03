import { CreateCity, ResponseCreateCity, ResponseWeather } from "../models/city.model";

export class CitiesController{
    
    //Create City
    async createCity(data:CreateCity):Promise<ResponseCreateCity>{
        try {
            const temperature = (await this.getWeather(data.name)).main.temp;
            const dataToCreate ={
                info: data,
                temperature,
            }
            localStorage.setItem(`${data.name}`,`${JSON.stringify(dataToCreate)}`);
            return dataToCreate;

        } catch (error) {
            throw new Error(`${error}`)
        } 
    }

    //Get Cities
    getCities():Array<Record<string,any>>{
        let cities =[];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key){
                const value = localStorage.getItem(key);
                value? cities.push(JSON.parse(value)): false;
            }            
        }
        return cities;
    }


    //City Weather Controller
    private async getWeather(name:string):Promise<ResponseWeather>{
        const domain:string ='https://api.openweathermap.org/data/2.5/weather';
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


}