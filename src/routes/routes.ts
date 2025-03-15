import { RouteNamesEnum } from "@/localConstants";
import { Unlock } from "@/pages/Unlock/Unlock";
import { RouteType } from "@/types";

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.unlock,
    title: "Unlock",
    component: Unlock,
  },
];
