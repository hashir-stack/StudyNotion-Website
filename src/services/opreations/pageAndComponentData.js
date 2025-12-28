import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) =>{
    const toastId = toast.loading("Loading...")
    let result = [];
    try {
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

        if(!response?.data?.success){
            throw new Error("Couldnot fetch category page data...")
        }

        result = response?.data;
    } catch (error) {
        console.log("Catalog Page Data API Error", error);
        toast.error(error)
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}