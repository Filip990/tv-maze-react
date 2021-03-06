import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner";
import Cast from "./components/Cast/Cast";
import DetailsList from "../../components/DetailsList/DetailsList";

import { Summary, ListContainer } from "./ShowDetails.styled";
import placeholderImg from "../../assets/no_image.jpg";

import { getShowDetails } from "./store/actionCreators/ActionCreators";

const ShowDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { details, isFetching, error } = useSelector(
    (state) => state.showDetails
  );

  useEffect(() => {
    dispatch(getShowDetails(id));
  }, [dispatch, id]);

  return isFetching ? (
    <Spinner />
  ) : error ? (
    <div> {error.message} </div>
  ) : (
    <>
      <h1>{details.name}</h1>
      <Link to={`/seasons/${id}`}>Show all seasons &#10148;</Link>
      <ListContainer>
        <img src={details.image || placeholderImg} alt="" />
        <DetailsList {...details} />
      </ListContainer>
      <Summary>{details.summary || "No summary provided"}</Summary>
      {details.cast.length !== 0 && <Cast cast={details.cast} />}
    </>
  );
};

export default ShowDetails;
