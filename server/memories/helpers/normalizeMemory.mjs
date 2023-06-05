const normalizeMemory = (rawMemory, userId) => {
  return {
    ...rawMemory,
    user_id: userId,
    location: {
      ...rawMemory.location,
      state: rawMemory.state || "",
      region: rawMemory.region || "",
      city: rawMemory.city || "",
      street: rawMemory.street || "",
      houseNumber: rawMemory.houseNumber || "",
    },
  };
};

export default normalizeMemory;
