import Afdelingen from "Pages/Afdelingen";
import App from "Pages/App";
import OnsTeam from "Pages/OnsTeam";
import OverOns from "Pages/OverOns";
import Praktisch from "Pages/Praktisch";
import Shop from "Pages/Shop";
import Themas from "Pages/Themas";

export const possibleRoutes = {
  home: App,
  praktisch: Praktisch,
  themas: Themas,
  shop: Shop,
  afdelingen: Afdelingen,
  "over-ons": OverOns,
  "ons-team": OnsTeam,
};
