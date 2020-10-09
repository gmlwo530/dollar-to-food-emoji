import React from "react";
import {
  LinearGradient,
  GradientLightgreenGreen,
  GradientPinkRed,
} from "@visx/gradient";
import { Food } from "../data";

const Gradients: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case Food.lemon:
      return <LinearGradient id={Food.lemon} from="#FDEB71" to="#F8D800" />;
    case Food.watermelon:
      return (
        <LinearGradient id={Food.watermelon} from="#F05F57" to="#138086" />
      );
    case Food.kiwi:
      return <GradientLightgreenGreen id={Food.kiwi} />;
    case Food.apple:
      return <GradientPinkRed id={Food.apple} />;
    case Food.grape:
      return <LinearGradient id={Food.grape} from="#351CAB" to="#621A61" />;
    case Food.pineapple:
      return <LinearGradient id={Food.pineapple} from="#56C696" to="#FFDB01" />;
    case Food.banana:
      return <LinearGradient id={Food.banana} from="#FDEB71" to="#F8D800" />;
    case Food.melon:
      return <LinearGradient id={Food.melon} from="#81FBB8" to="#28C76F" />;
    default:
      return <GradientPinkRed id={id} />;
  }
};

export default Gradients;
