import React from "react";

import { CastContainer, Image, CastLink } from "./Cast.styled";

const Cast = (props) => {
  const uniqActors = Array.from(
    // filter duplicates, API returns duplicates for some reason
    new Map(
      Object.values(props.cast).map((actor) => [actor.person.id, actor])
    ).values()
  );

  return (
    <>
      <h3>Cast:</h3>
      <CastContainer>
        {uniqActors.map((actor) => (
          <CastLink to={`/person/${actor.person.id}`} key={actor.person.id}>
            <Image src={actor.person.image?.medium} alt="" />
            <p>
              {actor.person.name} as {actor.character.name}
            </p>
          </CastLink>
        ))}
      </CastContainer>
    </>
  );
};

export default Cast;
