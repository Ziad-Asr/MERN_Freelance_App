import React from "react";
import Review from "../review/Review";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["rewiews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong"
        : data.map((review) => {
            return <Review key={review._id} review={review} />;
          })}
    </div>
  );
};

export default Reviews;
