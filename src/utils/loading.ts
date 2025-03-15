import { LOADING_EVENT } from "@/constant";


export const setLoading = (loading:boolean) => {
    console.log('mlebu')
    const myEvent = new CustomEvent(LOADING_EVENT, { detail: { isLoading: loading } });
    document.dispatchEvent(myEvent);
}