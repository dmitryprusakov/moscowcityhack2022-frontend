import { Link, Outlet, Route, Routes } from 'react-router-dom';
import React, { FC, Suspense, memo } from 'react';

import { Analyzer } from 'features';

import { Result } from 'antd';
import css from './index.module.css';

const About = () => {
  return (
    <div className={css.about}>
      <span>API: http://84.252.137.43:8000/docs#/</span>
      <span>Фронтенд Github: https://github.com/DmitryTevtonsky/moscowcityhack2022-frontend</span>
      <span>Расширение Chrome: https://github.com/DmitryTevtonsky/DmitryTevtonsky-moscowcityhack2022-extension</span>
      <br />
      <span>Установка расширения:</span>
      <span>0. Скачать архив исходного кода из репозитория через кнопку Code - Download ZIP;</span>
      <span>1. Распаковать архив с расширением;</span>
      <span>2. Перейти в браузер Chrome;</span>
      <span>3. Вставить в строку поиска `chrome://extensions`;</span>
      <span>4. В правой верхней части экрана включить - Режим разработчика;</span>
      <span>5. Слева сверху нажать - Загрузить распакованное расширение;</span>
      <span>6. Через открывшийся интерфейс проводника выбрать распакованную в п.1 папку;</span>
      <span>7. Расширение должно появиться в правой верхней части браузера в специальном разделе (иконка пазла);</span>
      <span>8. Нажатие на иконку расширения открывает его интерфейс, теперь с ним можно взаимодействовать.</span>
    </div>
  );
};

const Main: FC = () => {
  return (
    <div className={css.scroller}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Analyzer />} />
            <Route path="/about" element={<About />} />

            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={<Link to="/">Back to main page</Link>}
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default memo(Main);
