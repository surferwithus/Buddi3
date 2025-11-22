import { parseCSV } from "./csvParser"

const data = parseCSV("data/hot100_archive_1958_2021.csv") // 인자는 string, 반환값은 배열

// npx tsx ./lib/testCsvParser.ts 하면 실행 됨
console.log(`총 레코드 수: $[data.length]`);
console.log(JSON.stringify(data[0], null, 2)); // csv 파일 읽는 것