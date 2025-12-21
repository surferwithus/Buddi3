import fs from 'fs'
import path from "path";

export interface CSVRow {
  chart_date: string,
  current_position: string,
  title: string,
  performer: string,
  previous_position: string,
  peak_position: string,
  week_on_chart: string
}

export function parseCSV(filepath: string): CSVRow[] {
  const fullPath = path.join(process.cwd(), filepath)
  const fileContent = fs.readFileSync(fullPath, 'utf-8')
  const lines = fileContent.split('\n').filter(line => line.trim() !== '')

  if (lines.length === 0) {
    return []
  }

  const headers = lines[0].split(',').map(h => h.trim())

  const rows: CSVRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      rows.push(row as CSVRow)
    }
  }

  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export function getChartDataByDate(date: string): CSVRow[] {
  const allData = parseCSV('data/hot100_archive_1958_2021.csv')
  return allData.filter(row => row.chart_date === date)
}

export function getLatestChartData(): CSVRow[] {
  const allData = parseCSV('data/hot100_archive_1958_2021.csv')

  const dates = [...new Set(allData.map(row => row.chart_date))].sort().reverse()
  const latestDate = dates[0]

  const latestData = allData
    .filter(row => row.chart_date === latestDate)
    .sort((a, b) => parseInt(a.current_position) - parseInt(b.current_position))
    .slice(0, 100)

  return latestData
}