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

export interface JejuItem {
    address: string;
    title: string;
    image1: string;
    x:number;
    y:number;
    hit:number;
    contenttype:number;
    contentid:number;
    restdate:string;
    infocenter:string;
    parking:string;
    msg:string;
    usetime:string;
}

export interface JejuData {
    list:JejuItem[];
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
}

export interface YoutubeItem {
    id:{
        videoId:number;
    }
    snippet:{
        title:string;
        description:string;
        thumbnail:{
            medium:{
                url:string;
            }
        }
    }
}

export interface YoutubeResponse{
    items:YoutubeItem[];
}