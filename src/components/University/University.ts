import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export type FeeRow = {
  id?: number;
  year: number;
  semester?: string;
  tuition: string;
  hostel?: string;
  insurance?: string;
  other?: string;
  notes?: string;
};

export interface University {
  id: number;
  name: string;
  city: string;
  country: string;
  recognitions: Recognitions[];
  banner: Image;
  about_img: Image;
  highlights: Highlights[];
  fees: {
    id: number;
    GEL: number;
    USD: number;
    RUB: number;
    fees_details: FeeRow[];
    includes: Recognitions[];
    excludes: Recognitions[];
  };
  university_requirements: {
    id: number;
    accordion: [
      {
        id: number;
        question: string;
        answer: string;
      }
    ];
  };
  gallery: Image[];
  about: string;
  hostelimage: Image[];
  university_infrastructure_images: Image[];
  university_infrastructure: Recognitions[];
  slug?: string;
  admission_requirements: Recognitions[];
  admission_process: Recognitions[];
  hostelfacility: Recognitions[];
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

export interface NavData {
  id: number;
  name: string;
  slug: string;
  country: string;
}

type Uni = {
  name: string;
  to: string;
};

export type Category = {
  key: "georgia" | "russia";
  label: string;
  items: Uni[];
};

export const fetchGeorgiaUniversity = async () => {
  const country = "georgia";
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/mbbs-abroads?filters[country][$eqi]=${country}&populate[recognitions][populate]=true&populate[banner][fields][0]=url&populate[banner][fields][1]=name&populate[banner][fields][2]=documentId&populate[about_img][fields][0]=url&populate[about_img][fields][1]=name&populate[about_img][fields][2]=documentId&populate[highlights][populate]=true&populate[admission_requirements][populate]=true&populate[admission_process][populate]=true&populate[hostelfacility][populate]=true&populate[hostelimage][fields][0]=url&populate[hostelimage][fields][1]=name&populate[hostelimage][fields][2]=documentId&populate[university_infrastructure][populate]=true&populate[university_infrastructure_images][fields][0]=url&populate[university_infrastructure_images][fields][1]=name&populate[university_infrastructure_images][fields][2]=documentId&populate[fees][populate][includes][populate]=true&populate[fees][populate][excludes][populate]=true&populate[fees][populate][fees_details][populate]=true&populate[university_requirements][populate][accordion][populate]=true&populate[gallery][fields][0]=url&populate[gallery][fields][1]=name&populate[gallery][fields][2]=documentId`
  );
  return data?.data || [];
};

export const fetchRussiaUniversity = async () => {
  const country = "russia";
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/mbbs-abroads?filters[country][$eqi]=${country}&populate[recognitions][populate]=true&populate[banner][fields][0]=url&populate[banner][fields][1]=name&populate[banner][fields][2]=documentId&populate[about_img][fields][0]=url&populate[about_img][fields][1]=name&populate[about_img][fields][2]=documentId&populate[highlights][populate]=true&populate[admission_requirements][populate]=true&populate[admission_process][populate]=true&populate[hostelfacility][populate]=true&populate[hostelimage][fields][0]=url&populate[hostelimage][fields][1]=name&populate[hostelimage][fields][2]=documentId&populate[university_infrastructure][populate]=true&populate[university_infrastructure_images][fields][0]=url&populate[university_infrastructure_images][fields][1]=name&populate[university_infrastructure_images][fields][2]=documentId&populate[fees][populate][includes][populate]=true&populate[fees][populate][excludes][populate]=true&populate[fees][populate][fees_details][populate]=true&populate[university_requirements][populate][accordion][populate]=true&populate[gallery][fields][0]=url&populate[gallery][fields][1]=name&populate[gallery][fields][2]=documentId`
  );
  return data?.data || [];
};

export const useNavData = () => {
  return useQuery<Category[]>({
    queryKey: ["nav-data"],
    staleTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_CMS_GLOBALURL
        }/api/mbbs-abroads?fields[0]=slug&fields[1]=name&fields[2]=country`
      );

      const data = response?.data?.data || [];

      // Typed!
      const CATEGORIES: Category[] = [
        {
          key: "georgia",
          label: "MBBS IN GEORGIA",
          items: [],
        },
        {
          key: "russia",
          label: "MBBS IN RUSSIA",
          items: [],
        },
      ];

      data.forEach((uni) => {
        const country = uni?.country?.toLowerCase();

        if (country === "georgia") {
          CATEGORIES[0].items.push({
            name: uni.name,
            to: `/mbbs-abroad/georgia/${uni.slug}`,
          });
        }

        if (country === "russia") {
          CATEGORIES[1].items.push({
            name: uni.name,
            to: `/mbbs-abroad/russia/${uni.slug}`,
          });
        }
      });

      return CATEGORIES;
    },
  });
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
