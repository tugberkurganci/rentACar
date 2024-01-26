import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="sticky-bottom bg-dark text-light text-center">
      &copy; Hakları Saklıdır. Ocak 2024
      <div>
        <a
          href="https://www.flaticon.com/free-icons/minivan"
          title="minivan icons"
        >
          Minivan icons created by kerismaker - Flaticon
        </a>
      </div>
    </div>
  );
};

export default Footer;
