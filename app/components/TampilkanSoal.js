import React from 'react';
import { Card, List, Avatar, Button, Input } from 'antd';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

const UPDATE_JAWABAN = gql`
  mutation UPDATE_JAWABAN(
    $idSoalMahasiswa: ID!
    $idSoal: String!
    $idJawaban: String!
  ) {
    updateSoalMahasiswa(
      data: {
        jawaban: {
          upsert: {
            where: { idSoal: $idSoal }
            create: { idSoal: $idSoal, idJawaban: $idJawaban }
            update: { idJawaban: $idJawaban }
          }
        }
      }
      where: { id: $idSoalMahasiswa }
    ) {
      id
    }
  }
`;

const TampilkanSoal = props => {
  console.log(props, 'ini props tampilkan soal');
  const { pertanyaan, jawaban } = props.soal;

  const updateJawabanDb = async (client, idJawaban) => {
    const ngejawab = {
      idSoalMahasiswa: props.id,
      idSoal: props.soal.id,
      idJawaban
    };
    await client.mutate({
      mutation: UPDATE_JAWABAN,
      variables: ngejawab
    });

    console.log(client, 'ini client');
  };

  return (
    <Card title="Tampilkan Soal disini">
      <div>{pertanyaan} </div>
      <div>
        <h3>Pilihan Jawaban</h3>
        {jawaban.map(jawab => (
          <div key={jawab.id}>
            <ApolloConsumer>
              {client => (
                <Button
                  type={
                    props.jawaban.filter(item =>
                      item ? item.idJawaban === jawab.id : false
                    ).length
                      ? 'primary'
                      : 'danger'
                  }
                  onClick={() => {
                    updateJawabanDb(client, jawab.id);
                    /*
                      prop dari jawaban
                        id
                        idSoal
                        idJawaban
                        jawaban
                        pegangan
                    */
                    props.menjawab({
                      idSoal: props.soal.id,
                      idJawaban: jawab.id
                    });
                  }}
                >
                  {jawab.title}
                </Button>
              )}
            </ApolloConsumer>

            <p>{jawab.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TampilkanSoal;
