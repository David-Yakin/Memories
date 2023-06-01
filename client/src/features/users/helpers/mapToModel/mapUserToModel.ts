import UserInterface from "../../models/interfaces/UserInterface";
import { EditUserFormType } from "../../models/types/userTypes";

const mapUserToModel = (user: UserInterface): EditUserFormType => {
  return {
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last,
    phone: user.phone,
    url: user.image.url,
    alt: user.image.alt,
    state: user.address.state,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: String(user.address.houseNumber),
    zip: String(user.address.zip),
  };
};

export default mapUserToModel;
