import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

import ChartPanel from "../../component/_module/ChartPanel";
import FilterPanel from "../../component/_module/FilterPanel";
import styles from "./styles.module.scss";
import { IChartData, IFilteredData, ISelectOption } from "../../utils/types";

const MainPage: React.FC = () => {
  const csvUrl = `/data.csv`;

  const [analysisData, setAnalysisDataData] = useState<IChartData[]>([]);

  const [dataSourceOption, setDataSourceOption] = useState<ISelectOption[]>([]);
  const [campaignOption, setCampaignOption] = useState<ISelectOption[]>([]);

  const [dataSourceFilter, setDataSourceFilter] = useState<string[]>([]);
  const [campaignFilter, setCampaignFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvUrl);
      const text = await response.text();
      const result = Papa.parse(text, { header: true }).data as IChartData[];

      const dataSourceList = result.map((item) => item.Datasource);
      const campaignList = result.map((item) => item.Campaign);

      setDataSourceOption(
        [...new Set(dataSourceList)].map((item) => ({
          label: item,
          value: item,
        }))
      );
      setCampaignOption(
        [...new Set(campaignList)].map((item) => ({
          label: item,
          value: item,
        }))
      );
      setDataSourceFilter([...new Set(dataSourceList)]);
      setCampaignFilter([...new Set(campaignList)]);
      setAnalysisDataData(result);
    };
    fetchData();
  }, []);

  const cartData: IFilteredData[] = useMemo(
    () =>
      analysisData
        .filter(
          (item) =>
            dataSourceFilter.includes(item.Datasource) && campaignFilter.includes(item.Campaign)
        )
        .reduce((accumulator: IFilteredData[], curr: IChartData) => {
          const existingData = accumulator.find((item) => item.Date === curr.Date);
          if (existingData) {
            existingData.Clicks += parseInt(curr.Clicks);
            existingData.Impressions += curr.Impressions !== "" ? parseInt(curr.Impressions) : 0;
          } else {
            accumulator.push({
              Date: curr.Date,
              Clicks: parseInt(curr.Clicks),
              Impressions: curr.Impressions !== "" ? parseInt(curr.Impressions) : 0,
            });
          }
          return accumulator;
        }, []),
    [dataSourceFilter, campaignFilter]
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Adverity Advertising Data ETL-V Challenge</h1>
      <div className={styles.mainWrapper}>
        <FilterPanel
          dataSourceOption={dataSourceOption}
          campaignOption={campaignOption}
          onChangeFilterData={(val: { dataSourceFilter: string[]; campaignFilter: string[] }) => {
            setDataSourceFilter(val.dataSourceFilter);
            setCampaignFilter(val.campaignFilter);
          }}
        />
        <ChartPanel
          cartData={cartData}
          dataSourceTitleList={
            dataSourceFilter.length === dataSourceOption.length ? ["All"] : dataSourceFilter
          }
          campaignDataList={
            campaignFilter.length === campaignOption.length ? ["All"] : campaignFilter
          }
        />
      </div>
    </div>
  );
};

export default MainPage;
