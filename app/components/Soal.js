import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    soalUjianMahasiswa(id: $id, jwt: $jwt) {
      id
      ujian {
        id
      }
      soals {
        id
        pertanyaan
        jawaban {
          id
          content
          title
        }
      }
      jawaban {
        id
        pegangan
        idSoal
        jawaban {
          id
          title
        }
      }
    }
  }
`;

const Soal = props => (
  <Query
    {...props}
    query={INFO_UJIAN_QUERY}
    variables={{ id: props.id, jwt: props.jwt }}
  >
    {payload => props.children(payload)}
  </Query>
);

export default Soal;
