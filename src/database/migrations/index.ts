import { IDBResultEvent } from "../../utils/types";
import version1 from "./version1";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const migrations: ((db: IDBDatabase) => void)[] = [version1];

export default function (event: Event): void {
  const db = (event as IDBResultEvent<IDBDatabase>).target.result;
  const lastMigratedVersion = window.localStorage.getItem(
    "DB_MIGRATED_VERSION"
  );
  const idx = lastMigratedVersion ? parseInt(lastMigratedVersion) - 1 : 0;
  migrations.slice(idx).forEach((migrate) => migrate(db));
}
