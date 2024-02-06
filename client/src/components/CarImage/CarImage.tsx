import React, { useEffect, useState } from "react";
import axiosInstance, {
  axiosAssets,
} from "../../utils/interceptors/axiosInterceptors";
import axios from "axios";

type Props = { source?: string; model: string };

const Image = ({ source, model }: Props) => {
  return (
    <img
      className="img-fluid rounded"
      src={source ? `/assets/${model}/${source}` : ""}
    ></img>
  );
};

export default Image;
