import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Layout, Row, Col, Card, List, Avatar, Button, Spin } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Logo, SubLogo } from './Login';

const { Header, Content } = Layout;

const GET_SKOR = gql`
  query GET_SKOR($idSoalMahasiswa: ID!, $idUjian: ID!) {
    getInfosoalMahasiswa(
      where: { AND: [{ id: $idSoalMahasiswa }, { ujian: { id: $idUjian } }] }
    ) {
      id
      skor
      ujian {
        id
        nama
        kelas {
          id
          nama
          mataKuliah {
            id
            nama
          }
        }
      }
      mahasiswa {
        id
        nama
        image
        nim
      }
    }
  }
`;

const Hasil = props => {
  if (!props.history.location.state) return <Redirect to="/" />;

  const { idSoalMahasiswa, idUjian } = props.history.location.state;

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
            <h1 style={{ color: 'white' }}>CBT FMIPA UR</h1>
          </Logo>
        </div>
      </Header>
      <Content>
        <div style={{ margin: '2rem' }}>
          <Query query={GET_SKOR} variables={{ idSoalMahasiswa, idUjian }}>
            {({ data, error, loading }) => {
              if (loading) return <Spin tip={loading} />;

              const [soalMahasiswa] = data.getInfosoalMahasiswa;

              return (
                <Card>
                  <div
                    style={{
                      textAlign: 'center',
                      height: '500px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <h1 style={{ marginTop: '20px', fontSize: '30px' }}>
                      Skor ujian yang di Proleh{' '}
                    </h1>
                    <h1
                      style={{
                        fontSize: '60px',
                        marginTop: '30px',
                        color: 'blue',
                        textDecoration: 'underline'
                      }}
                    >
                      {soalMahasiswa.skor}
                    </h1>
                    <div>
                      <Button
                        type="primary"
                        icon="home"
                        size="large"
                        onClick={() =>
                          props.history.go(-(props.history.length - 1))
                        }
                      >
                        OK
                      </Button>
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                      <i>
                        Untuk mereview ujian yang telah dilaksanakan, silahkan
                        buka di aplikasi portal CBT FMIPA UR
                      </i>
                    </div>
                  </div>
                </Card>
              );
            }}
          </Query>
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(Hasil);
