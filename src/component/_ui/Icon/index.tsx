import React from "react";

import { ReactComponent as CircleHalf } from "./icons/circle-half.svg";
import { ReactComponent as Rotate } from "./icons/rotate.svg";

export type IconType = "CircleHalf" | "Rotate";

type Props = {
  name: IconType;
  className?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  if (!name) {
    return null;
  }

  const icons = {
    CircleHalf,
    Rotate,
  };

  const CurrentIcon = icons[name];
  return <CurrentIcon className={className} onClick={onClick} role={onClick && "button"} />;
};

export default Icon;
