import { Button, Form, Input, Tabs } from 'antd';
import { ExceptionOutlined, LinkOutlined } from '@ant-design/icons';
import React, { FC, memo, useState } from 'react';

import { FormFields } from 'types';
import { useAppDispatch } from 'store';

import { checkAnalysisData, sendDataToAnalyzis } from '../../redux/slice';

import css from './index.module.css';

const { TabPane } = Tabs;

const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const [activeTabKey, setActiveTabKey] = useState<string>('analyze-form-text');

  const [form] = Form.useForm();

  const handleChangeTab = (tabKey: string) => {
    setActiveTabKey(tabKey);
  };

  const onFinish = (values: FormFields) => {
    if (values.url) {
      const containHttps = values.url.includes('https://');
      const containHttp = values.url.includes('http://');

      if (!containHttp) {
        if (containHttps) return dispatch(sendDataToAnalyzis(values));

        form.setFieldsValue({ url: `https://${values.url}/` });
        return dispatch(sendDataToAnalyzis({ url: `https://${values.url}/` }));
      }

      if (!containHttps) {
        if (containHttp) return dispatch(sendDataToAnalyzis(values));

        form.setFieldsValue({ url: `http://${values.url}/` });
        return dispatch(sendDataToAnalyzis({ url: `http://${values.url}/` }));
      }
      dispatch(sendDataToAnalyzis(values));
    }

    dispatch(sendDataToAnalyzis(values));
  };

  // const handleCheck = () => {
  //   dispatch(checkAnalysisData('1'));
  // };

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={handleChangeTab}
      tabBarExtraContent={
        <>
          <Button type="primary" htmlType="submit" form={activeTabKey}>
            Анализировать
          </Button>
          {/* <Button onClick={handleCheck}>{'<check>'}</Button> */}
        </>
      }
    >
      <TabPane
        tab={
          <span className={css.tabTitle}>
            <ExceptionOutlined />
            Текст
          </span>
        }
        key="analyze-form-text"
      >
        <Form id="analyze-form-text" className={css.form} onFinish={onFinish}>
          <Form.Item name="title" rules={[{ required: true, message: 'Введите заголовок новости!' }]}>
            <Input size="large" placeholder="Заголовок новости" />
          </Form.Item>
          <Form.Item name="text" rules={[{ required: true, message: 'Ввудите текст новости!' }]}>
            <Input.TextArea size="large" showCount placeholder="Текст новости" />
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane
        tab={
          <span className={css.tabTitle}>
            <LinkOutlined />
            URL
          </span>
        }
        key="analyze-form-url"
      >
        <Form id="analyze-form-url" className={css.form} onFinish={onFinish} form={form}>
          <Form.Item name="url" rules={[{ required: true, message: 'Введите URL страницы с новостью!' }]}>
            <Input size="large" placeholder="URL страницы с новостью" />
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default memo(Controls);
