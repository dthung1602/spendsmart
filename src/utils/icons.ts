import type { IconName } from "@fortawesome/free-solid-svg-icons";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faBan,
  faBicycle,
  faBook,
  faBreadSlice,
  faBriefcase,
  faCar,
  faCocktail,
  faCoffee,
  faFaucet,
  faFilm,
  faGasPump,
  faHamburger,
  faHandHoldingHeart,
  faHeartbeat,
  faHome,
  faHouseUser,
  faIceCream,
  faMedkit,
  faMobile,
  faMotorcycle,
  faMusic,
  faPhone,
  faPiggyBank,
  faPizzaSlice,
  faPlane,
  faPlug,
  faPlus,
  faRandom,
  faShip,
  faTicketAlt,
  faUniversity,
  faUser,
  faUtensils,
  faWifi,
  faWineBottle,
  faWineGlass,
  faTachometerAlt,
  faFileMedicalAlt,
  faBullseye,
  faTools,
  faTrash,
  faTimesCircle,
  faPen,
  faHistory,
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const commonIcons = {
  faHome,
  faHouseUser,
  faFaucet,
  faPlug,
  faUtensils,
  faHamburger,
  faIceCream,
  faPizzaSlice,
  faBreadSlice,
  faCoffee,
  faCocktail,
  faWineBottle,
  faWineGlass,
  faGasPump,
  faCar,
  faMotorcycle,
  faBicycle,
  faPlane,
  faShip,
  faPhone,
  faMobile,
  faWifi,
  faMedkit,
  faHeartbeat,
  faBriefcase,
  faTicketAlt,
  faMusic,
  faFilm,
  faBook,
  faUniversity,
  faPiggyBank,
  faUser,
  faHandHoldingHeart,
  faRandom,
  faBan,
  faPlus,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faTachometerAlt,
  faFileMedicalAlt,
  faBullseye,
  faTools,
  faTrash,
  faTimesCircle,
  faPen,
  faHistory,
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle,
  faTimes,
};

library.add(...Array.from(Object.values(commonIcons)));

const commonIconNames = Object.keys(commonIcons).map((icon) =>
  icon.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).slice(3)
) as readonly IconName[];

export default commonIconNames;
