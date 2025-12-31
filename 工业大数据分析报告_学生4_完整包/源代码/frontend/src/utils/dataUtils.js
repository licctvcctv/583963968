// Data utilities for parsing and processing CSV data
import Papa from 'papaparse'

const DEFAULT_CSV_URL = '/ai4i2020.csv'
const DEFAULT_API_URL = 'http://localhost:8004/api/data/all'
const NUMERIC_FIELDS = new Set([
  'UDI',
  'Air temperature [K]',
  'Process temperature [K]',
  'Rotational speed [rpm]',
  'Torque [Nm]',
  'Tool wear [min]',
  'Machine failure',
  'TWF',
  'HDF',
  'PWF',
  'OSF',
  'RNF',
  'Maintenance_Cycle'
])

const cleanHeader = (header) => header.replace(/^\uFEFF/, '').trim()

const normalizeRow = (row = {}) => {
  const normalized = {}
  Object.entries(row).forEach(([key, value]) => {
    const cleanedKey = cleanHeader(key)
    if (value === '' || value === undefined || value === null) {
      normalized[cleanedKey] = null
      return
    }

    if (NUMERIC_FIELDS.has(cleanedKey)) {
      const numericValue = Number(value)
      normalized[cleanedKey] = Number.isFinite(numericValue) ? numericValue : value
      return
    }

    normalized[cleanedKey] = value
  })

  return normalized
}

const normalizeRows = (rows = []) => rows
  .map(normalizeRow)
  .filter(row => row && Object.values(row).some(value => value !== null && value !== ''))

export const parseCSVData = (csvText) => {
  const parsed = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: cleanHeader
  })

  return normalizeRows(parsed.data)
}

export const loadCsvData = (csvUrl = DEFAULT_CSV_URL) => new Promise((resolve, reject) => {
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: cleanHeader,
    complete: (results) => resolve(normalizeRows(results.data)),
    error: (error) => reject(error)
  })
})

const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.rows && Array.isArray(payload.rows)) return payload.rows
  return []
}

export const loadEquipmentData = async (
  { source = 'auto', csvUrl = DEFAULT_CSV_URL, apiUrl = DEFAULT_API_URL } = {}
) => {
  if (source === 'api' || source === 'auto') {
    try {
      const headers = {}
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(apiUrl, { headers })
      if (!response.ok) {
        if (source === 'api') {
          throw new Error(`Failed to fetch data (${response.status})`)
        }
      } else {
        const payload = await response.json()
        const rows = normalizeRows(normalizeApiResponse(payload))
        if (rows.length || source === 'api') {
          return rows
        }
      }
    } catch (error) {
      if (source === 'api') {
        throw error
      }
    }
  }

  return loadCsvData(csvUrl)
}

export const getAggregatedStats = (data = []) => {
  const totalRecords = data.length

  if (!totalRecords) {
    return {
      totalRecords: 0,
      failures: 0,
      failureRate: '0.00',
      byType: { L: 0, M: 0, H: 0 },
      avgAirTemp: '0.00',
      avgProcessTemp: '0.00',
      avgTorque: '0.00',
      failureTypes: { TWF: 0, HDF: 0, PWF: 0, OSF: 0, RNF: 0 }
    }
  }

  const failures = data.filter(d => Number(d['Machine failure']) === 1).length
  const failureRate = ((failures / totalRecords) * 100).toFixed(2)

  const byType = {
    L: data.filter(d => d.Type === 'L').length,
    M: data.filter(d => d.Type === 'M').length,
    H: data.filter(d => d.Type === 'H').length
  }

  const averageOf = (field) => {
    const values = data.map(d => Number(d[field])).filter(Number.isFinite)
    if (!values.length) return '0.00'
    return (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)
  }

  const avgAirTemp = averageOf('Air temperature [K]')
  const avgProcessTemp = averageOf('Process temperature [K]')
  const avgTorque = averageOf('Torque [Nm]')

  const failureTypes = {
    TWF: data.filter(d => Number(d.TWF) === 1).length,
    HDF: data.filter(d => Number(d.HDF) === 1).length,
    PWF: data.filter(d => Number(d.PWF) === 1).length,
    OSF: data.filter(d => Number(d.OSF) === 1).length,
    RNF: data.filter(d => Number(d.RNF) === 1).length
  }

  return {
    totalRecords,
    failures,
    failureRate,
    byType,
    avgAirTemp,
    avgProcessTemp,
    avgTorque,
    failureTypes
  }
}

export const getAlerts = (data) => {
  if (!Array.isArray(data) || data.length === 0) return []

  const alerts = []
  const total = data.length
  const startTime = Date.now() - 24 * 60 * 60 * 1000

  data.forEach((item, index) => {
    const udi = Number(item.UDI) || index + 1
    const timestamp = new Date(startTime + ((udi % total) / total) * 24 * 60 * 60 * 1000)
    const productId = item['Product ID'] || `${item.Type || 'U'}${udi}`

    if (Number(item['Machine failure']) === 1) {
      alerts.push({
        id: `${udi}-critical`,
        type: 'critical',
        severity: 'critical',
        title: '机器故障',
        message: `设备 ${productId} 检测到故障`,
        productId,
        timestamp,
        resolved: false
      })
    }

    if (Number(item['Tool wear [min]']) > 200) {
      alerts.push({
        id: `${udi}-wear`,
        type: 'warning',
        severity: 'warning',
        title: '工具磨损警告',
        message: `设备 ${productId} 工具磨损超过阈值`,
        productId,
        timestamp,
        resolved: false
      })
    }

    if (Number(item['Torque [Nm]']) > 60) {
      alerts.push({
        id: `${udi}-torque`,
        type: 'info',
        severity: 'info',
        title: '扭矩异常',
        message: `设备 ${productId} 扭矩过高: ${item['Torque [Nm]']} Nm`,
        productId,
        timestamp,
        resolved: false
      })
    }
  })

  return alerts.sort((a, b) => b.timestamp - a.timestamp)
}

export default {
  parseCSVData,
  loadCsvData,
  loadEquipmentData,
  getAggregatedStats,
  getAlerts
}
