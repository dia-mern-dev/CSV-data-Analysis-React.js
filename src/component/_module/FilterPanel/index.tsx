import React, { useEffect, useState } from "react";

import Icon from "../../_ui/Icon";
import styles from "./styles.module.scss";
import { ISelectOption } from "../../../utils/types";
import { MultiSelect } from "../../_ui/MultiSelect";

type Props = {
  dataSourceOption: ISelectOption[];
  campaignOption: ISelectOption[];
  onChangeFilterData: Function;
};

const FilterPanel: React.FC<Props> = ({ dataSourceOption, campaignOption, onChangeFilterData }) => {
  const [dataSourceValue, setDataSourceValue] = useState<ISelectOption[]>([]);
  const [campaignValue, setCampaignValue] = useState<ISelectOption[]>([]);

  const onClickButton = () => {
    const dataSourceFilter = dataSourceValue.map((item) => item.value);
    const campaignFilter = campaignValue.map((item) => item.value);
    onChangeFilterData({ dataSourceFilter, campaignFilter });
  };

  const dataSourceRefresh = () => {
    setDataSourceValue(dataSourceOption);
  };

  const campaignRefresh = () => {
    setCampaignValue(campaignOption);
  };

  useEffect(() => {
    if (campaignOption) setCampaignValue(campaignOption);
    if (dataSourceOption) setDataSourceValue(dataSourceOption);
  }, [campaignOption, dataSourceOption]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.filterTitle}>Filter dimension values</h2>
      <div className={styles.filterWrapper}>
        <div className={styles.selectWrapper}>
          <div className={styles.dataSourceWrapper}>
            <div className={styles.tools}>
              <p className={styles.subTitle}>Datasource</p>
              <Icon name='CircleHalf' className={styles.icon} />
              <Icon
                name='Rotate'
                className={styles.icon}
                onClick={() => {
                  dataSourceRefresh();
                }}
              />
            </div>
            <div className={styles.toolWrapper}>
              <MultiSelect
                options={dataSourceOption}
                selectedValue={dataSourceValue}
                setSelectedValue={setDataSourceValue}
                className={styles.select}
                label='All Datasource'
              />
            </div>
          </div>
          <div className={styles.dataSourceWrapper}>
            <div className={styles.tools}>
              <p className={styles.subTitle}>Campaign</p>
              <Icon name='CircleHalf' className={styles.icon} />
              <Icon
                name='Rotate'
                className={styles.icon}
                onClick={() => {
                  campaignRefresh();
                }}
              />
            </div>
            <MultiSelect
              options={campaignOption}
              selectedValue={campaignValue}
              setSelectedValue={setCampaignValue}
              className={styles.select}
              label='All Campaign'
            />
          </div>
        </div>
        <button
          className={styles.button}
          onClick={() => {
            onClickButton();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
