import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import { Logo, SubLogo } from './Login';
import NavigasiSoal from './NavigasiSoal';
import TampilkanSoal from './TampilkanSoal';
import InformasiMulaiUjian from './InformasiMulaiUjian';
import InformasiPeserta from './InformasiPeserta';

import Soal from './Soal';

const { Header, Content } = Layout;

class AppUjian extends Component {
  state = {
    soals: [],
    tampilkan: 0,
    jawaban: []
  };

  componentWillMount() {
    const { soals, jawaban } = this.props.bankSoal;
    this.setState({ soals, tampilkan: soals[0].id, jawaban });
  }

  pindahSoal = id => this.setState({ tampilkan: id });

  menjawabSoal = jawab => {
    // pishakan jawaban berupa idsoal, jawaban
    const jawabanLama = this.state.jawaban.filter(
      item => item.soal !== jawab.soal
    );
    this.setState({ jawaban: [...jawabanLama, jawab] });
  };

  render() {
    const { id, jwt } = this.props;
    console.log(this.props);

    return (
      <Content>
        <div style={{ margin: '2rem' }}>
          <Row type="flex" gutter={40}>
            <Col xs={24} md={6}>
              <InformasiMulaiUjian id={id} jwt={jwt} />
            </Col>
            <Col xs={24} md={12}>
              <TampilkanSoal
                soal={
                  this.state.soals.filter(
                    soal => soal.id === this.state.tampilkan
                  )[0]
                }
                jawaban={this.state.jawaban}
                menjawab={this.menjawabSoal}
              />
            </Col>
            <Col xs={24} md={6}>
              <NavigasiSoal
                soals={this.state.soals}
                tampilkan={this.state.tampilkan}
                navigasi={this.pindahSoal}
                jawaban={this.state.jawaban}
              />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

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
          height: '10rem',
          padding: '2rem 0',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div>
          <Logo>
            <img src="./logo.svg" alt="logo" />
            <h1 style={{ color: 'white' }}>CBT FMIPA UR Ujian</h1>
          </Logo>
        </div>
      </Header>
      <Soal id={id} jwt={jwt}>
        {({ data, error, loading }) => {
          if (loading) return <p>loading....</p>;
          if (error) console.log(error);

          console.log(data, 'ini data soal mahasiswa');

          return (
            <AppUjian bankSoal={data.soalUjianMahasiswa} id={id} jwt={jwt} />
          );
        }}
      </Soal>
    </Layout>
  );
};

export default withRouter(Persiapan);
