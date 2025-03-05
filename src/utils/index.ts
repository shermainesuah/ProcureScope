// Format date to "month dd, yyyy"
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
