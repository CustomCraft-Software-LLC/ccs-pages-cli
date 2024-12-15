import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      <title>Contact Page</title>
      <meta name="description" content="This is the Contact page." />
      <meta name="keywords" content="" />
      <meta property="og:title" content="Contact Page" />
      <meta property="og:description" content="This is the Contact page." />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
      <meta name="twitter:title" content="Contact Page" />
      <meta name="twitter:description" content="This is the Contact page." />
      <meta name="twitter:image" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default Seo;