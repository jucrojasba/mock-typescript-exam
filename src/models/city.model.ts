export interface ResponseWeather {
    main:       Main;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}

export interface CreateCity{
    name:string,
    country:string,
    createdAt:string,
    reason:string
}

export interface ResponseCreateCity{
    info: CreateCity,
    temperature: number
}