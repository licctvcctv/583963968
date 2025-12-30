const fs = require('fs');
const path = require('path');

const DATA_PATH = '/Users/a136/vs/583963968/ai4i2020 2.csv';
const OUTPUT_DIR = '/Users/a136/vs/583963968';

// 解析CSV
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const record = {};
    headers.forEach((header, idx) => {
      const val = values[idx]?.trim();
      record[header.trim()] = isNaN(Number(val)) ? val : Number(val);
    });
    records.push(record);
  }
  return records;
}

function generateSupplement(originalData, count = 600) {
  const supplement = [];
  const startUDI = Math.max(...originalData.map(d => d.UDI)) + 1;

  const typeCounts = originalData.reduce((acc, r) => {
    acc[r.Type] = (acc[r.Type] || 0) + 1;
    return acc;
  }, {});
  const total = Object.values(typeCounts).reduce((a, b) => a + b, 0);

  for (let i = 0; i < count; i++) {
    const udi = startUDI + i;
    const rand = Math.random();
    let type = 'M';
    let cum = 0;
    for (const t in typeCounts) {
      cum += typeCounts[t] / total;
      if (rand <= cum) { type = t; break; }
    }

    const airTemp = 298 + Math.random() * 5;
    const torque = type === 'L' ? 10 + Math.random() * 40 : type === 'M' ? 25 + Math.random() * 40 : 35 + Math.random() * 40;
    const toolWear = Math.floor(Math.random() * 250);

    supplement.push({
      UDI: udi,
      'Product ID': `${type}${Math.floor(Math.random() * 90000) + 10000}`,
      Type: type,
      'Air temperature [K]': Number(airTemp.toFixed(1)),
      'Process temperature [K]': Number((airTemp + 10 + Math.random() * 3).toFixed(1)),
      'Rotational speed [rpm]': Math.floor(1200 + Math.random() * 1000),
      'Torque [Nm]': Number(torque.toFixed(1)),
      'Tool wear [min]': toolWear,
      'Machine failure': toolWear > 200 || airTemp > 302 ? 1 : 0,
      TWF: toolWear > 200 ? 1 : 0,
      HDF: airTemp > 302 ? 1 : 0,
      PWF: Math.random() > 0.99 ? 1 : 0,
      OSF: torque > 65 ? 1 : 0,
      RNF: Math.random() > 0.995 ? 1 : 0,
      'Maintenance_Cycle': type === 'L' ? 30 : type === 'M' ? 45 : 60,
      'Load_Level': torque <= 30 ? '轻负载' : torque <= 50 ? '中负载' : '重负载'
    });
  }
  return supplement;
}

function toCSV(records) {
  if (!records.length) return '';
  const headers = Object.keys(records[0]);
  const headerLine = headers.join(',');
  const lines = records.map(r => headers.map(h => r[h]).join(','));
  return [headerLine, ...lines].join('\n');
}

// 主函数
const originalData = parseCSV(DATA_PATH);
console.log('原始数据:', originalData.length);

const supplement = generateSupplement(originalData, 600);
const combined = [...originalData.map(r => ({
  ...r,
  'Maintenance_Cycle': r.Type === 'L' ? 30 : r.Type === 'M' ? 45 : 60,
  'Load_Level': r['Torque [Nm]'] <= 30 ? '轻负载' : r['Torque [Nm]'] <= 50 ? '中负载' : '重负载'
})), ...supplement];

// 保存到4个系统
['student-1-system', 'student-2-system', 'student-3-system', 'student-4-system'].forEach(sys => {
  const dir = path.join(OUTPUT_DIR, sys, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'ai4i2020.csv'), '\uFEFF' + toCSV(combined), 'utf-8');
  console.log(`已保存: ${sys}`);
});

console.log('总数据:', combined.length);
