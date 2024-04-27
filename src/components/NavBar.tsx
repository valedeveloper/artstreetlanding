
import { cookies } from "next/headers";
import NavBarItems from "./NavBarItems";
import { getServerSideUser } from "@/lib/payload-utils";

async function NavBar() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("User:", user);


  return (

    <NavBarItems user={user} />

  );
}
export default NavBar;
