import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

const getSession = async () => {
  return await getServerSession(authOptions);
};

export default getSession;
