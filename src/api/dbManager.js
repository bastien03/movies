let db;
export function initDb(dbInstance) {
  db = dbInstance;
}

export default function getDb() {
  return db;
}
