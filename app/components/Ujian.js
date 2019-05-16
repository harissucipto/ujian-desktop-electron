import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';

import { Logo } from './Login';
import NavigasiSoal from './NavigasiSoal';
import TampilkanSoal from './TampilkanSoal';
import InformasiMulaiUjian from './InformasiMulaiUjian2';
import AkhiriUjian from './AkhiriUjian';
import BankSoal from './BankSoal';

import Soal from './Soal';

const { Header, Content } = Layout;

class AppUjian extends Component {
  state = {
    id: undefined,
    ujian: undefined,
    soals: [],
    tampilkan: 0,
    jawaban: [],
    noSoal: 1
  };

  componentWillMount() {
    const { soals, jawaban, id, ujian } = this.props.bankSoal;
    this.setState({
      soals,
      tampilkan: soals[0].id,
      jawaban,
      id,
      ujian: ujian.id
    });
  }

  pindahSoal = id => {
    const noSoal = this.state.soals.findIndex(item => item.id === id) + 1;
    this.setState({ tampilkan: id, noSoal });
  };

  majuSoal = () => {
    const noSoal = this.state.noSoal;

    const { id } = this.state.soals[noSoal];
    this.setState({ tampilkan: id, noSoal: noSoal + 1 });
  };

  mundurSoal = () => {
    const noSoal = this.state.noSoal - 1;
    if (noSoal === 0) return;
    const { id } = this.state.soals[noSoal - 1];
    this.setState({ tampilkan: id, noSoal });
  };

  menjawabSoal = jawab => {
    // pishakan jawaban berupa idsoal, jawaban

    console.log('jawab', jawab);
    const jawabanLama = this.state.jawaban.filter(
      item => item.idSoal !== jawab.idSoal
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
              <InformasiMulaiUjian
                id={id}
                jwt={jwt}
                soalMahasiswa={this.state.id}
              />
            </Col>
            <Col xs={24} md={12}>
              <TampilkanSoal
                noSoal={this.state.noSoal}
                banyakSoal={this.state.soals.length}
                soal={
                  this.state.soals.filter(
                    soal => soal.id === this.state.tampilkan
                  )[0]
                }
                jawaban={this.state.jawaban}
                menjawab={this.menjawabSoal}
                id={this.state.id}
                ujian={this.state.ujian}
                maju={this.majuSoal}
                mundur={this.mundurSoal}
              />
            </Col>
            <Col xs={24} md={6}>
              <NavigasiSoal
                soals={this.state.soals}
                tampilkan={this.state.tampilkan}
                navigasi={this.pindahSoal}
                jawaban={this.state.jawaban}
              />
              <AkhiriUjian id={this.state.id} />
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
            <img src="logo-ur.png" alt="logo" />
            <h1 style={{ color: 'white' }}>CBT FMIPA UR</h1>
          </Logo>
        </div>
      </Header>
      <BankSoal id={id} jwt={jwt}>
        {({ data, error, loading }) => {
          if (loading) return <p>loading</p>;
          if (error) return <p>Server gangguan</p>;
          const { soals } = data.infoUjian;
          console.log(soals, 'ini soals nya');
          return (
            <Soal id={id} jwt={jwt}>
              {({ data, error, loading }) => {
                if (loading) return <p>loading....</p>;
                if (error) console.log(error);

                const mengurutkanSoal = data.soalUjianMahasiswa.urutan
                  .split(',')
                  .map(urutan => {
                    const index = Number(urutan) - 1;
                    return soals[index];
                  });

                const bankSoal = {
                  ...data.soalUjianMahasiswa,
                  soals: mengurutkanSoal
                };

                return <AppUjian bankSoal={bankSoal} id={id} jwt={jwt} />;
              }}
            </Soal>
          );
        }}
      </BankSoal>
    </Layout>
  );
};

export default withRouter(Persiapan);
