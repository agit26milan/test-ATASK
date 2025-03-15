import { LOADING_EVENT } from "@/constant";


export const setLoading = (loading:boolean) => {
    const myEvent = new CustomEvent(LOADING_EVENT, { detail: { isLoading: loading } });
    document.dispatchEvent(myEvent);
}