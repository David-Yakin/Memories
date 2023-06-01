import AddressInterface from "./AddressInterface";
import ImageInterface from "./ImageInterface";
import NameInterface from "./NameInterface";

interface UserInterface {
  _id: string;
  name: NameInterface;
  phone: string;
  email: string;
  image: ImageInterface;
  address: AddressInterface;
  isAdmin: false;
  createdAt: Date;
}

export default UserInterface;
