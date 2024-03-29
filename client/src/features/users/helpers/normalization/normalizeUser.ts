import { RegistrationForm } from "../../models/types/userTypes";

const normalizeUser = (user: RegistrationForm) => {
  return {
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: +user.zip,
      houseNumber: +user.houseNumber,
    },
  };
};

export default normalizeUser;
