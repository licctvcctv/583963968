#!/usr/bin/env python3
import sys
sys.path.insert(0, '/Users/a136/.claude/skills/docx/ooxml')

from ooxml import Document

doc = Document('/tmp/student1_unpacked')

# 获取页边距设置
sect_pr = doc.body.findall('.//w:sectPr', doc.ns)
if sect_pr:
    sect_pr = sect_pr[-1]  # 获取最后一个section
    pg_mar = sect_pr.find('w:pgMar', doc.ns)
    if pg_mar is None:
        from ooxml.element import Element
        pg_mar = Element('w:pgMar', ns=doc.ns)
        sect_pr.insert(0, pg_mar)
    # 设置页边距与模板一致: top=1440, right=1800, bottom=1440, left=1800
    pg_mar.set('{%s}top' % doc.ns['w'], '1440')
    pg_mar.set('{%s}right' % doc.ns['w'], '1800')
    pg_mar.set('{%s}bottom' % doc.ns['w'], '1440')
    pg_mar.set('{%s}left' % doc.ns['w'], '1800')

doc.save('/tmp/student1_unpacked')
print("页边距已调整完成")
