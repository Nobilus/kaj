import { LatLngExpression } from "leaflet";

export default interface IAfdeling {
  naam: string;
  coords: LatLngExpression;
  tel?: string;
  "e-mail"?: string;
}
