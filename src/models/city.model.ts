export interface ResponseWeather {
    weather:    Weather[];
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

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface CreateCity{
    name:string,
    country:string,
    createdAt:Date,
    reason:string
}

export interface ResponseCreateCity{
    info: CreateCity,
    temperature: number
}