export const getCookie = (req: any, name: string) => req.cookies?.[name];

export const setCookie = (
  res: any,
  name: string,
  value: string,
  config: {
    days?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
  } = {}
) => {
  res.cookie(name, value, {
    maxAge: (config.days ?? 7) * 86400000,
    httpOnly: config.httpOnly ?? true,
    secure: config.secure ?? true,
    sameSite: config.sameSite ?? "lax",
    path: config.path ?? "/",
  });
};

export const deleteCookie = (res: any, name: string, path = "/") =>
  res.clearCookie(name, { path });
