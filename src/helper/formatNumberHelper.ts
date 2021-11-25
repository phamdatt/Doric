import numbro from "numbro";

export function formatNumber(value: number | string) {
  return numbro(value).format({
    mantissa: 0,
    thousandSeparated: true,
    average: false,
  });
}
