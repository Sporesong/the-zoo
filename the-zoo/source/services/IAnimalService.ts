import axios from "axios";
import { Ianimal } from "../models/Ianimal";

export const getAnimals = async () => {
    const response = await axios.get<Ianimal[]>("https://animals.azurewebsites.net/api/animals");
    return response.data; 
}