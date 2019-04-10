import React from 'react';
import { Card, List, Avatar, Spin } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoPesertaUjian(id: $id, jwt: $jwt) {
      id
      email
      mahasiswa {
        image
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
        if (loading) return <Spin />;
        if (error) console.log(error);
        if (error) return <p>Error</p>;
        console.log(data);

        const { infoPesertaUjian } = data;

        return (
          <Card title="Informasi Peserta Ujian " loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                shape="square"
                src={infoPesertaUjian.mahasiswa.image}
                size={200}
              />
            </div>

            <List>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon="user"
                      style={{ backgroundColor: 'goldenrod' }}
                    />
                  }
                  title="Nama"
                  description={infoPesertaUjian.mahasiswa.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon="info" style={{ backgroundColor: 'blue' }} />
                  }
                  title="NIM"
                  description={infoPesertaUjian.mahasiswa.nim}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar icon="mail" style={{ backgroundColor: 'orange' }} />
                  }
                  title="Email"
                  description={infoPesertaUjian.email}
                />
              </List.Item>
            </List>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default InformasiUjian;
