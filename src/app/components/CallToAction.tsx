"use client";
import Link from "next/link";
import { PropsCallAction } from "../../../types/types";

function CallToAction({
  href="",
  title,
  className,
  onClick,
}: PropsCallAction): JSX.Element {
  return href !== "" ? (
    <Link href={href}>
      <button  className={"button-call" + className}>
        {title}
      </button>
    </Link>
  ) : (
    <button onClick={onClick} className={"button-call" + className}>
      {title}
    </button>
  );
}
export default CallToAction;
