export const formatNumber = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export const toNumber = (value: string) => Number(value.split(",").join("")) || 0;
