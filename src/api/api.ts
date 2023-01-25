import axios from "axios";
import { CatalogResults } from "./types";


const instance = axios.create({
    baseURL: "http://contest.elecard.ru/frontend_data"
  });
export const getAllCatalog = async () => {
 
    const res = await instance.get<Promise<CatalogResults[]>>(`/catalog.json`)
    return res.data
}
