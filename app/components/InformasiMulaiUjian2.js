import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment-timezone';

import { height } from 'window-size';
import { CREATE_SKOR } from './AkhiriUjian';

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
  console.log('ini props saya', props);
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

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
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
                <p style={{ fontSize: '20px', color: 'goldenrod' }}>
                  Sisa Waktu Ujian
                </p>
                <ApolloConsumer>
                  {client => (
                    <Countdown
                      onComplete={async () => {
                        const nilaiSkor = await client.mutate({
                          mutation: CREATE_SKOR,
                          variables: {
                            soalMahasiswa: props.soalMahasiswa
                          }
                        });

                        props.history.push({
                          pathname: '/hasil',
                          state: {
                            idSoalMahasiswa: nilaiSkor.data.createSkor.id,
                            idUjian: nilaiSkor.data.createSkor.ujian.id
                          }
                        });
                      }}
                      date={moment(moment.unix(durasiPengerjaan).format())}
                    />
                  )}
                </ApolloConsumer>
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
              <p style={{ fontSize: '20px', color: 'goldenrod' }}>
                Hitung mundur waktu pelaksanaan
              </p>
              {days}, {hours}:{minutes}:{seconds}
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
