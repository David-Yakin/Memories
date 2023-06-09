import React from "react";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import MemoryBodyRow from "./MemoryBodyRow";
import MemoryInterface from "../../models/interfaces/MemoryInterface";
import { makeFirstLetterCapital } from "../../utils/algoMethods";
import NameInterface from "../../../users/models/interfaces/NameInterface";

type Props = { memory: MemoryInterface };

const MemoryBody: React.FC<Props> = ({ memory }) => {
  const { location, description, peopleInPic } = memory;
  const { country, region, street, houseNumber, city } = location;

  const render = (term: string | number | void) => {
    if (typeof term === "string") return term ? term : "";
    return term ? String(term) : "";
  };

  const renderPeople = (people: NameInterface[]) => {
    let peopleToString: string = "";
    people.map(
      (person, index, array) =>
        (peopleToString += `${makeFirstLetterCapital(person.first)} ${render(
          person.middle
        )} ${person.last}${index !== array.length - 1 ? ", " : ""}`)
    );
    return peopleToString;
  };

  return (
    <CardContent sx={{ pb: 1 }}>
      <Box mt={1}>
        <MemoryBodyRow
          title="Location"
          content={`${render(street)} ${render(houseNumber)} ${render(
            city
          )} ${render(region)} ${country} `}
        />
        <MemoryBodyRow title="description" content={description} />
        {!!peopleInPic.length && (
          <MemoryBodyRow
            title="people in the picture"
            content={renderPeople(peopleInPic)}
          />
        )}
      </Box>
    </CardContent>
  );
};

export default MemoryBody;
