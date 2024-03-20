
import React from "react";
import { MenuItem } from "../../types/types";
import Link from "next/link";

function ItemNav({ href, item }: MenuItem) {
  return (
    <Link href={href}>
      <li className="item-hover">{item}</li>
    </Link>
  );
}

export default ItemNav;
