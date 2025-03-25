import React from "react";

function Footer() {
  return (
    <footer className="text-center text-sm mt-12 mx-auto py-8 text-[#97A3B6]">
      Coded by{" "}
      <a
        href="https://sheraz-ahmad.netlify.app"
        className="no-underline text-gray-200 font-semibold hover:underline"
      >
        Sheraz Ahmad
      </a>{" "}
      | Challenge by
      <a
        href="https://www.devchallenges.io?ref=challenge"
        className="text-gray-200 font-semibold hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {" "}
        devChallenges.io
      </a>
      . |{" "}
      <a
        href="https://github.com/sherazmalik-se/sheraz-ahmad/tree/main/projects/devchallenges/frontend-libraries/country-page"
        className="text-gray-200 font-semibold hover:underline"
      >
        Source code
      </a>
    </footer>
  );
}

export default Footer;
