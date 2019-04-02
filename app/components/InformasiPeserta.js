import React from 'react';
import { Card, List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoPesertaUjian(id: $id, jwt: $jwt) {
      id
      email
      mahasiswa {
        id
        nama
        nim
      }
    }
  }
`;

const QueryInfoUjian = props => (
  <Query
    {...props}
    query={INFO_UJIAN_QUERY}
    variables={{ id: props.id, jwt: props.jwt }}
  >
    {payload => props.children(payload)}
  </Query>
);

const InformasiUjian = props => {
  const { id, jwt } = props;
  if (!id || !jwt) return <p>Error, Anda Tidak boleh curang...</p>;

  return (
    <QueryInfoUjian id={id} jwt={jwt}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading...</p>;
        if (error) console.log(error);
        if (error) return <p>Error</p>;
        console.log(data);

        const { infoPesertaUjian } = data;

        return (
          <Card
            cover={
              infoPesertaUjian.mahasiswa.gambar ? (
                <img
                  alt="example"
                  src={infoPesertaUjian.mahasiswa.gambar}
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
            title="Informasi Peserta Ujian "
          >
            <Card.Meta
              description={
                <List>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="user" />}
                      title="Nama"
                      description={infoPesertaUjian.mahasiswa.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="info" />}
                      title="NIM"
                      description={infoPesertaUjian.mahasiswa.nim}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title="Email"
                      description={infoPesertaUjian.email}
                    />
                  </List.Item>
                </List>
              }
            />
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default InformasiUjian;
