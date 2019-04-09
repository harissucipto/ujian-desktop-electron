import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment-timezone';

require('moment/locale/id');

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      nama
      durasiPengerjaan
      tanggalPelaksanaan
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

        const durasiPengerjaan =
          moment(infoUjian.tanggalPelaksanaan).unix() +
          Number(infoUjian.durasiPengerjaan) * 60;

        const renderer = ({ hours, minutes, seconds, completed }) => {
          if (completed) {
            // Render a completed state
            return (
              <div
                style={{
                  fontSize: '30px',
                  padding: '10px',
                  fontWeight: 700,
                  color: 'blue'
                }}
              >
                <p>Sisa Waktu Ujian</p>
                <Countdown
                  onComplete={() => {
                    props.history.push('/');
                  }}
                  date={moment(moment.unix(durasiPengerjaan).format())}
                />

                <Button
                  style={{ marginTop: '10px' }}
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
                  Kerjakan
                </Button>
              </div>
            );
          }
          // Render a countdown
          return (
            <span
              style={{
                fontSize: '30px',
                padding: '10px',
                fontWeight: 700,
                color: 'blue'
              }}
            >
              <h1 style={{ fontSize: '20px', color: 'goldenrod' }}>
                Hitung mundur waktu pelaksanaan
              </h1>
              {hours}:{minutes}:{seconds}
            </span>
          );
        };

        return (
          <Card>
            <div
              style={{
                textAlign: 'center',
                border: '2px solid black',
                padding: '40px'
              }}
            >
              <Countdown
                renderer={renderer}
                date={moment(infoUjian.tanggalPelaksanaan).format()}
              />
            </div>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default withRouter(InformasiUjian);
