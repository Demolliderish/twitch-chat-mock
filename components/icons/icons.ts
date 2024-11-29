import dynamic from "next/dynamic";
function lazy(importFn: () => Promise<typeof import("*.svg")>) {
  return dynamic(async () => {
    const m = await importFn();
    return m;
  });
}

export const icons = {
  CSTM_bits: lazy(async () => import("../../public/icons/bits.svg")),
  CSTM_cheer: lazy(async () => import("../../public/icons/cheer.svg")),
  CSTM_exit: lazy(async () => import("../../public/icons/exit.svg")),
  CSTM_face: lazy(async () => import("../../public/icons/face.svg")),
  CSTM_settings: lazy(async () => import("../../public/icons/settings.svg")),
  CSTM_users: lazy(async () => import("../../public/icons/users.svg")),
  CSTM_star: lazy(async () => import("../../public/icons/star.svg")),
};
