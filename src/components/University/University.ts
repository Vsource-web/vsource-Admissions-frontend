import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
export interface University {
  id: number;
  documentId: string;
  name: string;
  city: string;
  country: string;
  about: string;
  slug: string;
  recognitions: Recognitions[];
  banner: Image;
  about_img: Image;
  highlights: Highlights[];
  admission_requirements: Recognitions[];
  admission_process: Recognitions[];
  gallery: Image[];
  city_infra_images: Image;
  hostelimage: Image;
}

export interface Recognitions {
  id: number;
  lists: string;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name?: string;
}

export interface Highlights {
  id: number;
  label: string;
  value: string;
}

export const fetchGeorgiaUniversity = async () => {
  const country = "georgia";
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/mbbs-abroads?filters[country][$eqi]=${country}&populate[recognitions][populate]=true&populate[banner][fields][0]=url&populate[banner][fields][1]=name&populate[banner][fields][2]=documentId&populate[about_img][fields][0]=url&populate[about_img][fields][1]=name&populate[about_img][fields][2]=documentId&populate[highlights][populate]=true&populate[admission_requirements][populate]=true&populate[admission_process][populate]=true&populate[hostelfacility][populate]=true&populate[hostelimage][fields][0]=url&populate[hostelimage][fields][1]=name&populate[hostelimage][fields][2]=documentId&populate[city_infra][populate]=true&populate[city_infra_images][fields][0]=url&populate[city_infra_images][fields][1]=name&populate[city_infra_images][fields][2]=documentId&populate[faqs][populate][accordion][populate]=true&populate[gallery][fields][0]=url&populate[gallery][fields][1]=name&populate[gallery][fields][2]=documentId`
  );
  return data?.data || [];
};

export const fetchRussiaUniversity = async () => {
  const country = "russia";
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/mbbs-abroads?filters[country][$eqi]=${country}&populate[recognitions][populate]=true&populate[banner][fields][0]=url&populate[banner][fields][1]=name&populate[banner][fields][2]=documentId&populate[about_img][fields][0]=url&populate[about_img][fields][1]=name&populate[about_img][fields][2]=documentId&populate[highlights][populate]=true&populate[admission_requirements][populate]=true&populate[admission_process][populate]=true&populate[hostelfacility][populate]=true&populate[hostelimage][fields][0]=url&populate[hostelimage][fields][1]=name&populate[hostelimage][fields][2]=documentId&populate[city_infra][populate]=true&populate[city_infra_images][fields][0]=url&populate[city_infra_images][fields][1]=name&populate[city_infra_images][fields][2]=documentId&populate[faqs][populate][accordion][populate]=true&populate[gallery][fields][0]=url&populate[gallery][fields][1]=name&populate[gallery][fields][2]=documentId`
  );
  return data?.data || [];
};

export const useGeorgia = () => {
  return useQuery<University[]>({
    queryKey: ["fetchGeorgia"],
    queryFn: fetchGeorgiaUniversity,
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export const useRussia = () => {
  return useQuery<University[]>({
    queryKey: ["fetchRussia"],
    queryFn: fetchRussiaUniversity,
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
