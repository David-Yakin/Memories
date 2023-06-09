import React, { useState, FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { makeFirstLetterCapital } from "../../utils/algoMethods";
import { MemoryType, NameType } from "../../models/types/memoriesTypes";
import FormButton from "../../../forms/components/FormButton";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";

const INITIAL_PERSON: NameType = { first: "", middle: "", last: "", _id: "" };

type Props = {
  setData: (data: MemoryType) => void;
  data: MemoryType;
};
const CreatePerson: FC<Props> = ({ setData, data }) => {
  const [person, setPerson] = useState<NameType>(INITIAL_PERSON);

  const handleSetPerson = () => {
    const newPerson = { ...person, _id: crypto.randomUUID() };

    setData({
      ...data,
      peopleInPic: [...data.peopleInPic, newPerson],
    });

    setPerson(INITIAL_PERSON);
  };

  const handleDelete = (personId: string) => {
    const filteredPeople = data.peopleInPic.filter(
      item => item._id !== personId
    );
    setData({ ...data, peopleInPic: filteredPeople });
  };

  return (
    <>
      <Grid item>
        <Typography variant="overline" component="span">
          {!data.peopleInPic.length
            ? " Add the names of the people who are in the photo"
            : "People in the photo: "}
        </Typography>
        {data.peopleInPic.map((item, index) => (
          <Chip
            component="span"
            variant="outlined"
            color="secondary"
            key={index}
            label={item.first + " " + item.middle + " " + item.last}
            size="small"
            onDelete={() => handleDelete(item._id!)}
          />
        ))}
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} xl={3}>
          <TextField
            name="first"
            variant="outlined"
            label={makeFirstLetterCapital("first")}
            id="first"
            value={person.first}
            error={Boolean(person.first.length === 1)}
            helperText={
              person.first.length === 1
                ? "First name must be at least two characters long"
                : ""
            }
            onChange={e =>
              setPerson(prev => ({ ...prev, first: e.target.value }))
            }
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <TextField
            name="middle"
            variant="outlined"
            label={makeFirstLetterCapital("middle")}
            id="middle"
            value={person.middle}
            onChange={e =>
              setPerson(prev => ({ ...prev, middle: e.target.value }))
            }
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <TextField
            name="last"
            variant="outlined"
            label={makeFirstLetterCapital("last")}
            id="last"
            value={person.last ? person.last : ""}
            error={Boolean(person.last.length === 1)}
            helperText={
              person.last.length === 1
                ? "Last name must be at least two characters long"
                : ""
            }
            onChange={e =>
              setPerson(prev => ({ ...prev, last: e.target.value }))
            }
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3} sx={{ display: "flex" }}>
          <FormButton
            component="div"
            node={<AddIcon />}
            onClick={handleSetPerson}
            disabled={Boolean(
              person.first.length < 2 || person.last.length < 2
            )}
            size="large"
            color="secondary"
            variant="contained"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreatePerson;
