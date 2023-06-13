// import { MemoryType } from "../../models/types/memoriesTypes";

// const normalizeCreateMemory = (rawMemory: MemoryType) => {
//   return {
//     title: rawMemory.title,
//     description: rawMemory.description,
//     image: {
//       url: rawMemory.imageUrl,
//       alt: rawMemory.imageAlt,
//     },
//     peopleInPic: rawMemory.peopleInPic,
//     location: {
//       state: rawMemory.state,
//       region: rawMemory.region,
//       country: rawMemory.country,
//       city: rawMemory.city,
//       street: rawMemory.street,
//     },
//   };
// };

// export default normalizeCreateMemory;
import { MemoryType } from "../../models/types/memoriesTypes";

const normalizeCreateMemory = (rawMemory: MemoryType) => {
  return {
    // title: rawMemory.title,
    description: rawMemory.description,
    image: {
      url: rawMemory.imageUrl,
      alt: rawMemory.title,
    },
    peopleInPic: rawMemory.peopleInPic,
    location: {
      state: rawMemory.state,
      region: rawMemory.region,
      country: rawMemory.country,
      city: rawMemory.city,
      street: rawMemory.street,
    },
  };
};

export default normalizeCreateMemory;
