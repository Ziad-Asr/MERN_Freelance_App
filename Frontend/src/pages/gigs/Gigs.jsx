import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "./../../utils/newRequest";
// import { gigs } from "../../data";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const params = window.location.search;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      params || minRef.current.value || maxRef.current.value || sort
        ? newRequest
            .get(
              `/gigs${params}&min=${minRef?.current?.value}&max=${maxRef?.current?.value}&sort=${sort}`
            )
            .then((res) => {
              return res.data;
            })
        : newRequest.get(`/gigs`).then((res) => {
            return res.data;
          }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          Freelance &gt; Graphics &amp; Design &gt;
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Freelances AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading"
            : error
            ? "Something went wrong"
            : data?.map((gig) => <GigCard key={gig.id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
