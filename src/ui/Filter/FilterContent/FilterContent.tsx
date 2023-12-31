import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Space, DatePicker, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { markedValues } from '../model/const';
import { mainTableFilterSelector } from 'store/filters/filtersSelectors';
import {
  MainTableFilter,
  resetMainTableFilter,
  setMainTableFilter,
} from 'store/filters/filtersSlice';
import { RangeValue } from '../model/types';
import { MarkupType } from 'shared/consts/constants';

const { RangePicker } = DatePicker;

type FilterContentProps = {
  onSubmit: (values: MainTableFilter) => void;
};

export const FilterContent = ({ onSubmit }: FilterContentProps) => {
  const dispatch = useDispatch();
  const {
    name: nameDefault,
    markupState: markedDefault,
    dateRange: dateRangeDefault,
  } = useSelector(mainTableFilterSelector);

  const [form] = Form.useForm();

  const [name, setName] = useState<{ value: string | undefined }>(nameDefault);
  const [markupState, setMarkupState] = useState(markedDefault);
  const [dateRange, setDateRange] = useState<{
    dateFrom: string | undefined;
    dateTo: string | undefined;
  }>(dateRangeDefault);
  const [isReset, setIsReset] = useState(false);

  const initialValues = useMemo(() => {
    return {
      name: nameDefault.value,
      marked: markedDefault.value,
      date: [
        dateRangeDefault.dateFrom ? dayjs(dateRangeDefault.dateFrom) : null,
        dateRangeDefault.dateTo ? dayjs(dateRangeDefault.dateTo) : null,
      ],
    };
  }, [nameDefault, markedDefault, dateRangeDefault]);

  const resetFieldsStates = useCallback(() => {
    setName({ value: undefined });
    setMarkupState({ value: MarkupType.ALL });
    setDateRange({
      dateFrom: undefined,
      dateTo: undefined,
    });
  }, []);

  const handleReset = () => {
    dispatch(resetMainTableFilter());
    form.resetFields();
    setIsReset(true);
    form.setFieldsValue(initialValues);
    resetFieldsStates();
    onSubmit({
      name: { value: undefined },
      markupState: { value: undefined },
      dateRange: {
        dateFrom: undefined,
        dateTo: undefined,
      },
    });
  };

  const handleSubmit = () => {
    dispatch(setMainTableFilter({ name, markupState, dateRange }));
    onSubmit({ name, markupState, dateRange });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName({ value: event.target.value });
  };

  const onMarkedChange = (val: MarkupType) => {
    setMarkupState({ value: val });
  };

  const onDateRangeChange = (_: RangeValue<Dayjs>, dateStrings: string[]) => {
    setDateRange({
      dateFrom: dateStrings.at(0) || undefined,
      dateTo: dateStrings.at(1) || undefined,
    });
  };

  useEffect(() => {
    if (isReset) {
      form.setFieldsValue(initialValues);
      setIsReset(false);
    }
  }, [isReset, form, initialValues]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form name="main-filter" layout="vertical" form={form}>
      <Row>
        <Space wrap>
          <Col>
            <Form.Item label="Название" name="name" id="name">
              <Input
                placeholder="Название содержит"
                prefix={<SearchOutlined />}
                onChange={onNameChange}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Статус разметки" name="marked" id="marked">
              <Select
                style={{ width: 140 }}
                options={markedValues}
                onChange={onMarkedChange}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Дата" name="date" id="date">
              <RangePicker locale={locale} onChange={onDateRangeChange} />
            </Form.Item>
          </Col>
        </Space>
      </Row>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Применить
        </Button>
        <Button type="default" onClick={handleReset}>
          Сбросить фильтр
        </Button>
      </Space>
    </Form>
  );
};
