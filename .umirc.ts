import { IConfig } from 'umi-types';

const config: IConfig = {
  plugins: [
    ['umi-plugin-block-dev', {layout: 'ant-design-pro',menu: {name:'主页',icon:'home'}}],
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        local: true
      },
    ],
  ],
};

export default config;
