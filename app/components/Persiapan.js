import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import { Logo, SubLogo } from './Login';
import InformasiUjian from './InformasiUjian';
import InformasiMulaiUjian from './InformasiMulaiUjian';
import InformasiPeserta from './InformasiPeserta';

const { Header, Content } = Layout;

const Persiapan = props => {
  console.log(props.history.location.state, 'ini state contoh');
  if (!props.history.location.state) {
    return <Redirect to="/" />;
  }

  const { id, jwt } = props.history.location.state;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          height: '13rem',
          padding: '2rem 0',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div>
          <Logo>
            <img src="./logo.svg" alt="logo" />
            <h1 style={{ color: 'white' }}>CBT FMIPA UR</h1>
          </Logo>
        </div>
        <h2 style={{ color: 'white' }}>
          Informasi Ujian yang akan dilaksanakan
          <Link to="/">ke home</Link>
        </h2>
      </Header>
      <Content>
        <div style={{ margin: '2rem' }}>
          <Row type="flex" gutter={40}>
            <Col xs={24} md={8}>
              <InformasiUjian id={id} jwt={jwt} />
            </Col>
            <Col xs={24} md={8}>
              <InformasiPeserta id={id} jwt={jwt} />
            </Col>
            <Col xs={24} md={8}>
              <InformasiMulaiUjian id={id} jwt={jwt} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(Persiapan);
