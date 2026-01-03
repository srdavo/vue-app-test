export const formatCurrency = (amount, symbol = '$') => {
  if (Number.isNaN(amount)) {
    return `${symbol}0`;
  }
  return `${symbol}${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return '';
  const [year, month, day] = yyyyMmDd.split('-');
  return `${month}/${day}/${year}`;
};

export const parseDate = (yyyyMmDd) => {
  const [year, month, day] = yyyyMmDd.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const getCurrentMonthKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `txn_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};
