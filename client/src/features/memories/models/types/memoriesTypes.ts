export type NameType = {
  _id?: string;
  first: string;
  middle?: string;
  last: string;
};

export type LocationType = {
  state?: string;
  country: string;
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
};

export type MemoryType = {
  title: string;
  description: string;
  imageUrl: string;
  // imageAlt: string;
  peopleInPic: NameType[];
  state?: string;
  country: string;
  region?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
};

export type MemoryErrorType = Partial<MemoryType>;
