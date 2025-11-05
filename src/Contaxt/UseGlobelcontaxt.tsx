import React, { createContext, useContext, ReactNode ,  useEffect , useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/components/Helper/Base_Url";

// 🔹 Common API Response Type
interface ApiResponse<T> {
  data: T[];
  message?: string;
  status?: string;
}

interface Banner {
  id: number;
  image: string;
  page: string;
  banner_title: string;
  banner_sub_title: string;
}


// 🔹 ContactUs Type
interface ContactUs {
  ContactUs_id?: number;
  ContactUs_Name?: string;
  ContactUs_description?: string;
  ContactUs_Emailid_header?: string;
  ContactUs_EMAIL_ID?: string;
  ContactUs_mobile_number_header?: string;
  ContactUs_Mobile_Number_1?: string;
  ContactUs_Mobile_Number_2?: string;
  ContactUs_Address1_head?: string;
  ContactUs_Address1?: string;
  Facebook?: string | null;
  Instagram?: string | null;
  Linkedin?: string | null;
  Youtube?: string | null;
  footer_description?: string;
  brand_logo?: string | null;
  [key: string]: any;
}

// 🔹 Tour Type
interface Tour {
  Tour_id: number;
  tour_title: string;
  slug: string;
  price: string;
  duration: string;
  category: string;
  banner_img: string;
  thumb_img: string;
  itineraries?: {
    day_number: number;
    day_heading: string;
    day_detail: string;
  }[];
  facilities?: {
    facility_name: string;
    include_exclude: string;
  }[];
  specifications?: {
    specification_name: string;
    specification_value: string;
  }[];
  ratings?: {
    rating: number;
    comment: string;
  }[];
  [key: string]: any;
}

interface City {
  [key: string]: any;
}


// 🔹 Global context type
interface GlobalContextType {
  contactData?: ContactUs;
  contactLoading: boolean;
  tourData?: Tour[];
  tourLoading: boolean;
  cities?: City[];
  isLoading:boolean;
  banners?: Banner[];
  getBannerByPage: (page: string) => Banner[];
}

// 🔹 Create context
const GlobalContext = createContext<GlobalContextType | null>(null);

//
// ─── API CALLS ─────────────────────────────────────────────
//

// ✅ Fetch ContactUs API
const fetchContactUs = async (): Promise<ContactUs> => {
  const res = await fetch(`${BASE_URL}/contactus/`);
  if (!res.ok) throw new Error(`Failed to fetch Contact Us data: ${res.status}`);
  const json: ApiResponse<ContactUs> = await res.json();
  return json?.data?.[0] || {};
};

// ✅ Fetch Tour API
const fetchTours = async (): Promise<Tour[]> => {
  const res = await fetch(`${BASE_URL}/tour/`);
  if (!res.ok) throw new Error(`Failed to fetch Tour data: ${res.status}`);
  const json: Tour[] = await res.json();
  return json;
};

//
// ─── PROVIDER COMPONENT ───────────────────────────────────
//

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [banners, setBanners] = useState<Banner[]>([]);
  // ContactUs Query
  const {
    data: contactData,
    isLoading: contactLoading,
  } = useQuery<ContactUs>({
    queryKey: ["contactus"],
    queryFn: fetchContactUs,
    staleTime: 1000 * 60 * 10,
  });

   useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${BASE_URL}/banner/`);
        const data = await res.json();
        console.log("data",data)
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);
 const getBannerByPage = (page: string) =>
    banners.filter((b) => b.page?.toLowerCase() === page.toLowerCase());

  // Tour Query
  const {
    data: tourData,
    isLoading: tourLoading,
  } = useQuery<Tour[]>({
    queryKey: ["tour"],
    queryFn: fetchTours,
    staleTime: 1000 * 60 * 10,
  });

  const fetchCities = async () => {
    const res = await fetch(`${BASE_URL}/city/`);
    const data = await res.json();
    return data;
  };

  // 🔹 React Query to handle fetching, caching, loading
  const { data: cities, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 10, 
  });

  return (
    <GlobalContext.Provider
      value={{
        contactData,
        contactLoading,
        tourData,
        tourLoading,
        cities, 
        isLoading , 
        banners , 
        getBannerByPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//
// ─── CUSTOM HOOK ──────────────────────────────────────────
//

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};
