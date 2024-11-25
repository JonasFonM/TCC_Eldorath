import { NavLink, useOutlet } from "@remix-run/react";
import { useState } from "react";

interface props {
  name: string;
  isHidden: boolean;
  entity: string;
  id: string;
  onShow: () => void;
  onCancel: () => void;

}

export function AnimatedTitle({ name, isHidden, onShow, onCancel, entity, id }: props) {
  const [outlet] = useState(useOutlet())
  return outlet
}