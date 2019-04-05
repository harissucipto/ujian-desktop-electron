import React from 'react';
import { Card, List, Avatar, Button, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_SKOR = gql`
  mutation CREATE_SKOR($soalMahasiswa: ID!) {
    createSkor(soalMahasiswa: $soalMahasiswa) {
      id
      nilai
    }
  }
`;

const TampilkanSoal = props => (
  <Mutation mutation={CREATE_SKOR} variables={{ soalMahasiswa: props.id }}>
    {(createSkor, { error, loading, data }) => {
      if (loading) return <p> loading...</p>;
      if (error) console.log(error, 'eror skor');

      return (
        <Button
          type="danger"
          size="large"
          onClick={async () => {
            const nilaiSkor = await createSkor();
            props.history.push({
              pathname: '/hasil',
              state: {
                idSoalMahasiswa: props.id,
                idSkor: nilaiSkor.data.createSkor.id
              }
            });
          }}
        >
          Akhiri Ujian
        </Button>
      );
    }}
  </Mutation>
);

export default withRouter(TampilkanSoal);
export { CREATE_SKOR };
