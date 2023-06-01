import React, { FC, ChangeEvent } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import FormLink from "../../forms/components/FormLink";
import Joi from "joi";
import { LoginErrors, LoginType } from "../models/types/userTypes";
import ROUTS from "../../routes/routesModel";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: LoginErrors;
  data: LoginType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm: FC<Props> = ({
  onSubmit,
  onReset,
  onFormChange,
  errors,
  data,
  onInputChange,
}) => {
  return (
    <Form
      title="Login"
      onSubmit={onSubmit}
      onReset={onReset}
      onFormChange={onFormChange}
      spacing={1}
      styles={{ maxWidth: "450px" }}>
      <Input
        label="email"
        name="email"
        type="email"
        data={data}
        error={errors.email}
        onInputChange={onInputChange}
      />
      <Input
        label="password"
        name="password"
        type="password"
        data={data}
        error={errors.password}
        onInputChange={onInputChange}
      />

      <FormLink text="Did not registered yet?" to={ROUTS.SIGNUP} />
    </Form>
  );
};

export default LoginForm;
