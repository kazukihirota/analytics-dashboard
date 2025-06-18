export function getChartColor(index: number): string {
  const colorIndex = (index % 10) + 1;
  return `var(--chart-${colorIndex})`;
}
