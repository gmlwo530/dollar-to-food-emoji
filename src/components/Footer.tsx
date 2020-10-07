import React from "react";

import "../sass/footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="copyright">
        2020 &copy;{" "}
        <a href="https://github.com/gmlwo530" target="blank">
          gmlwo530
        </a>
      </div>
    </footer>
  );
};
