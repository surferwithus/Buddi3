import { parseCSV } from "./csvParser"

const data = parseCSV("data/hot100_archive_1958_2021.csv")

console.log(`총 레코드 수: $[data.length]`);
console.log(JSON.stringify(data[0], null, 2));