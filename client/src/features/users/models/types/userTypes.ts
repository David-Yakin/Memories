export type CurrentUser = { _id: string; isAdmin: boolean };

export type LoginType = { email: string; password: string };
export type LoginErrors = Partial<LoginType>;

export type RegistrationForm = {
  first: string;
  middle?: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
};

export type RegistrationFormErrors = Partial<RegistrationForm>;

export type EditUserFormType = Omit<RegistrationForm, "email" | "password">;
export type EditUserFormErrorsType = Partial<EditUserFormType>;
