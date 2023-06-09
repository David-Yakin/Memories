import React, { FC, ChangeEvent } from "react";
import Joi from "joi";
import { MemoryErrorType, MemoryType } from "../../models/types/memoriesTypes";
import Form from "../../../forms/components/Form";
import ROUTES from "../../../routes/routesModel";
import Input from "../../../forms/components/Input";
import { Grid } from "@mui/material";
import CreatePerson from "./CreatePerson";

type Props = {
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: MemoryErrorType;
  data: MemoryType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setData: (data: MemoryType) => void;
};

const CreateMemoryForm: FC<Props> = ({
  onSubmit,
  onReset,
  onFormChange,
  errors,
  data,
  onInputChange,
  setData,
}) => {
  return (
    <Form
      title="create new memory"
      onSubmit={onSubmit}
      onReset={onReset}
      onFormChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      spacing={1}
      to={ROUTES.ROOT}>
      <Input
        name="title"
        label="title"
        error={errors.title}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="imageUrl"
        label="image Url"
        error={errors.imageUrl}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="imageAlt"
        label="image description"
        error={errors.imageAlt}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="state"
        label="state"
        error={errors.state}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="country"
        label="country"
        error={errors.country}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="region"
        label="region"
        error={errors.region}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        name="houseNumber"
        label="house Number"
        error={errors.houseNumber}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
        required={false}
        type="number"
      />
      <Grid item xs={12}>
        <CreatePerson data={data} setData={setData} />
      </Grid>
    </Form>
  );
};

export default CreateMemoryForm;
