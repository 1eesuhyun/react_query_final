import {YoutubeItem,YoutubeResponse} from "../../commons/commonsData";

const API_KEY=""
export const YoutubeApi = async (keyword: string):Promise<YoutubeResponse> => {
    const response=await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${keyword}&type=video&key=AIzaSyDoSl9GenEyotJqX64maXUM1axzpI3CsQk`);
    if(!response.ok){
        throw new Error("Youtube API returned");
    }
    return await response.json();
}

export default YoutubeApi