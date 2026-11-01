import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface BioLinkInterface {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BioLink() {
  const [isBioLinkOpen, setIsBioLinkOpen] = useState<boolean>(false);

  return <></>;
}
