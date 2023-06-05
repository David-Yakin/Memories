import NameInterface from "../../users/models/interfaces/NameInterface";
import ImageInterface from "./ImageInterface";
import LocationInterface from "./LocationInterface";

interface MemoryInterface {
  _id: string;
  title: string;
  description: string;
  image: ImageInterface;
  peopleInPic: NameInterface[];
  location: LocationInterface;
  likes: string[];
  createdAt: Date;
  sharedWith: string[];
  categories?: string[];
  user_id: string;
}

export default MemoryInterface;
