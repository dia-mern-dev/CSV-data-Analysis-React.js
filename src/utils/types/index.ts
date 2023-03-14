export interface IChartData {
  Date: string;
  Datasource: string;
  Campaign: string;
  Clicks: string;
  Impressions: string;
}

export interface IFilteredData {
  Date: string;
  Clicks: number;
  Impressions: number;
}

export interface ISelectOption {
  label: string;
  value: string;
}
