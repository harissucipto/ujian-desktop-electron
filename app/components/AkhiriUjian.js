import React from 'react';
import {
  Card,
  List,
  Avatar,
  Button,
  Input,
  Spin,
  Popconfirm,
  Icon,
  message
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_SKOR = gql`
  mutation CREATE_SKOR($soalMahasiswa: ID!) {
    createSkor(soalMahasiswa: $soalMahasiswa) {
      id
      skor
      ujian {
        id
      }
    }
  }
`;

const TampilkanSoal = props => (
  <Mutation mutation={CREATE_SKOR} variables={{ soalMahasiswa: props.id }}>
    {(createSkor, { error, loading, data }) => {
      if (loading) return <Spin tip="Loading..." />;
      if (error) console.log(error, 'eror skor');

      return (
        <Popconfirm
          title="Anda ingin mengakhiri ujian？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          onConfirm={async () => {
            const { data } = await createSkor().catch(() =>
              message.error('Silahkan klik ulang, koneksi internet bermasalah!')
            );
            props.history.push({
              pathname: '/hasil',
              state: {
                idSoalMahasiswa: data.createSkor.id,
                idUjian: data.createSkor.ujian.id
              }
            });
          }}
        >
          <Button
            style={{
              marginTop: '20px',
              height: '100px',
              width: '100%',
              fontWeight: 700,
              fontSize: '20px'
            }}
            type="danger"
            size="large"
          >
            Akhiri Ujian
          </Button>
        </Popconfirm>
      );
    }}
  </Mutation>
);

export default withRouter(TampilkanSoal);
export { CREATE_SKOR };
