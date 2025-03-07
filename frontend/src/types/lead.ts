import { JSX } from "react";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
}

export interface StatusOption {
  value: string;
  color: string;
  icon: JSX.Element;
}
