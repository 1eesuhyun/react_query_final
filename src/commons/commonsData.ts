export interface MainItem {
    contentid: number;
    title: string;
    address: string;
    image1:string;
    hit: number;
    contenttype:number;
}

export interface TravelItem {
    contentid: number;
    title: string;
    address: string;
    image1:string;
    hit: number;
    contenttype:number;
}

export interface MainData {
    main:MainItem;
    slist:TravelItem[];
    blist:TravelItem[];
    jlist:TravelItem[];
}