import React from "react";
import { Helmet } from "react-helmet";

const Meta = (props) => {
  const { title, description, keywords } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
    title: "Welcome To TV-Shows",
    description: "We sell the best movies & series for cheap",
    keywords: "electronics, buy electronics, cheap electroincs",
  };
  

export default Meta;
