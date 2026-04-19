/* ============================================
   MergeUi CSV Export Utility (관리자 엑셀 다운로드)
   UTF-8 BOM 포함으로 Excel 한글 호환
   사용법: MergeCSV.export('파일명.csv', ['헤더1','헤더2'], [[값1,값2], ...])
   ============================================ */
(function() {
  'use strict';

  function toCSVValue(v) {
    if (v === null || v === undefined) return '';
    var s = String(v);
    // 따옴표·쉼표·줄바꿈 포함 시 따옴표로 감싸고 내부 따옴표는 이스케이프
    if (/[",\n\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function formatDate(d) {
    if (!d) return '';
    try {
      var dt = (d instanceof Date) ? d : new Date(d);
      if (isNaN(dt.getTime())) return '';
      var Y = dt.getFullYear();
      var M = String(dt.getMonth() + 1).padStart(2, '0');
      var D = String(dt.getDate()).padStart(2, '0');
      var h = String(dt.getHours()).padStart(2, '0');
      var m = String(dt.getMinutes()).padStart(2, '0');
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m;
    } catch (e) { return ''; }
  }

  function exportCSV(filename, headers, rows) {
    if (!Array.isArray(headers) || !Array.isArray(rows)) {
      console.error('[MergeCSV] headers, rows must be arrays');
      return;
    }
    var BOM = '\uFEFF'; // Excel 한글 깨짐 방지
    var csv = BOM + headers.map(toCSVValue).join(',') + '\r\n';
    csv += rows.map(function(row) {
      return (row || []).map(toCSVValue).join(',');
    }).join('\r\n');

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 100);
  }

  function timestampForFilename() {
    var d = new Date();
    var Y = d.getFullYear();
    var M = String(d.getMonth() + 1).padStart(2, '0');
    var D = String(d.getDate()).padStart(2, '0');
    return Y + M + D;
  }

  window.MergeCSV = {
    export: exportCSV,
    formatDate: formatDate,
    timestamp: timestampForFilename
  };
})();
