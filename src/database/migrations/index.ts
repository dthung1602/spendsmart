import { IDBResultEvent } from "../../utils/types";
import version1 from "./version1";
import localStorage from "../localstorage";

const migrations: ((db: IDBDatabase) => void)[] = [version1];

export default function (event: Event): void {
  const db = (event as IDBResultEvent<IDBDatabase>).target.result;

  migrations.slice(localStorage.lastMigratedVersion).forEach((migrate) => {
    migrate(db);
  });
}
