import { Container } from "@mui/material";
// import React, { useEffect } from "react";
// import { getMemories } from "../api/memoriesApi";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MemoryInterface from "../interfaces/MemoryInterface";
import MemoriesFeedback from "../components/MemoriesFeedback";

const MemoriesPage = () => {
  const memories: MemoryInterface[] = [
    {
      _id: "123456",
      title: "iguana",
      createdAt: new Date(),
      description: "testing testing testing testing testing testing ",
      image: {
        url: "https://cdn.pixabay.com/photo/2017/02/05/11/43/iguana-2039719_1280.jpg",
        alt: "iguana",
      },
      likes: [],
      peopleInPic: [
        { first: "david", last: "yakin" },
        { first: "yifat", last: "yakin" },
      ],
      location: { country: "israel", region: "negev" },
      sharedWith: [],
      user_id: "654321",
    },
  ];

  // const dispatch = useAppDispatch();
  // const { loading, error, memories } = useAppSelector(state => state.memories);

  // useEffect(() => {
  //   dispatch(getMemories());
  // }, []);

  return (
    <Container>
      <MemoriesFeedback memories={memories} error={null} isLoading={false} />
    </Container>
  );
};

export default MemoriesPage;
