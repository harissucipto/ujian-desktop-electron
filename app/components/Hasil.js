import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Layout, Row, Col, Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Logo, SubLogo } from './Login';

const { Header, Content } = Layout;

const GET_SKOR = gql`
  query GET_SKOR($id: ID!) {
    skor(where: { id: $id }) {
      id
      nilai
      soalMahasiswa {
        mahasiswa {
          id
          nama
          nim
          user {
            id
            email
          }
        }
      }
    }
  }
`;

const Hasil = props => {
  if (!props.history.location.state) return <Redirect to="/" />;

  const { idSkor } = props.history.location.state;
  console.log(idSkor, 'ini id skor');
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
          <Query query={GET_SKOR} variables={{ id: idSkor }}>
            {({ data, error, loading }) => {
              if (loading) return <p>loading...</p>;
              console.log(error);

              const { skor } = data;

              return (
                <Row type="flex" gutter={40}>
                  <Col xs={24} md={6}>
                    <Card
                      cover={
                        skor.soalMahasiswa.mahasiswa.gambar ? (
                          <img
                            alt="example"
                            src={skor.mahasiswa.gambar}
                            width="100"
                            height="200"
                          />
                        ) : (
                          <div
                            style={{
                              height: '200px',
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            <Avatar
                              icon="user"
                              shape="square"
                              size={200}
                              style={{ textAlign: 'center' }}
                            />
                          </div>
                        )
                      }
                    >
                      <Card.Meta
                        description={
                          <List>
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar icon="user" />}
                                title="Nama"
                                description={skor.soalMahasiswa.mahasiswa.nama}
                              />
                            </List.Item>
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar icon="info" />}
                                title="NIM"
                                description={skor.soalMahasiswa.mahasiswa.nim}
                              />
                            </List.Item>
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar icon="mail" />}
                                title="Email"
                                description={
                                  skor.soalMahasiswa.mahasiswa.user.email
                                }
                              />
                            </List.Item>
                          </List>
                        }
                      />
                    </Card>
                  </Col>
                  <Col xs={24} md={10}>
                    <Card>
                      <div
                        style={{
                          textAlign: 'center',
                          height: '500px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <h1>Skor Hasil Ujian</h1>
                        <h1>{skor.nilai}</h1>
                        <div>
                          <Button
                            onClick={() =>
                              props.history.go(-(props.history.length - 1))
                            }
                          >
                            OK
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              );
            }}
          </Query>
        </div>
      </Content>
    </Layout>
  );
};

export default withRouter(Hasil);
