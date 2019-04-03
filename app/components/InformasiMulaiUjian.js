import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      nama
      durasiPengerjaan
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

        const { infoUjian } = data;

        return (
          <Card>
            <div
              style={{
                textAlign: 'center',
                border: '2px solid black',
                paddingTop: '1rem',
                marginBottom: '1rem'
              }}
            >
              <h2 style={{ fontWeight: 400, fontSize: '2rem' }}>
                Sisa Waktu Ujian
              </h2>
              <p style={{ fontWeight: 400, fontSize: '5rem' }}>
                {infoUjian.durasiPengerjaan}
              </p>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                props.history.push({
                  pathname: '/ujian',
                  state: {
                    id,
                    jwt
                  }
                });
              }}
            >
              Mulai Ujian
            </Button>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default withRouter(InformasiUjian);
