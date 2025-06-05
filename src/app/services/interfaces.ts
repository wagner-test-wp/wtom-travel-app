/*
export interface TravelResult{
    id : number;
    name : string;
    utazas_tipus_id : number;
    utazas_tipus_name : string;
    tol :string;
    ig : string;
    url :string;
    utvonal : string;
    alutazas : SubTravelResult[];

}
*/

export interface TravelResult{
    id : number;
    name : string;
    utazas_tipus_id : number;
    utazas_tipus_name : string;
    tol :string;
    ig : string;
    url :string;
    utvonal : string;
    alutazas : SubTravelResult[];
}

export interface SubTravelResult{
    id : number;
    name : string;
    utazas_tipus_id : number;
    utazas_tipus_name : string;
    tol :string;
    ig : string;
    url :string;
    utvonal : string;
}

export interface programShort{
    id : number;
    name : string;
    varos : string;
    description: string;
    image : string;
}

export interface travelDay{
    id : number;
    name : string;
    programs : programShort[];
}

export interface travelShort{
    id : number;
    name : string;
    utazas_tipus_id : number;
    days : travelDay[];
}