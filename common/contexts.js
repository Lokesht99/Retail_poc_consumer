import { createContext } from "react";

export const SiteSettingContext = createContext({
  setting: {
    minimumOrderLimit: 1,
    payments: [],
    general: {
      contact: {
        address: "",
        email: "",
        phoneNumbers: [],
        location: {
          lat: "",
          lon: "",
        },
      },
      appStoreUrl: "",
      playStoreUrl: "",
      socialMedias: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
    },
  },
  update: (value) => {},
});
