import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    return <Spin indicator={antIcon} />
}
