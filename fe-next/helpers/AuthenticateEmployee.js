import axios from "axios";
import { applyServerSideCookie } from "next-universal-cookie";
import { BACKEND } from "../helpers";

const NOEMPLOYEE = {
  props: {
    employee: false,
  },
};

export async function AuthenticateEmployee({ req, res }) {
  applyServerSideCookie(req, res);
  let token = "";
  if (!(token = req?.cookies?.token)) {
    return NOEMPLOYEE;
  }

  try {
    const me = await axios.get(BACKEND + "/api/employees/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      props: {
        employee: me.data,
        token
      },
    };
  } catch (error) {
    res.clearCookie();
    return NOEMPLOYEE;
  }
}
