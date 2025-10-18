/**
 * formatters.js
 * Fungsi helper untuk format data tampilan
 */

export function formatIpk(ipk) {
  if (ipk == null) return '-';
  return parseFloat(ipk).toFixed(2);
}

export function formatTanggal(isoString) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

export function formatTanggalSingkat(isoString) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return date.toLocaleDateString('id-ID');
}

export function formatNomorHP(hp) {
  if (!hp) return '-';
  return hp;
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
