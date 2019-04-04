import React from 'react';
import { Card, List, Avatar, Button, Input } from 'antd';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';
import shortid from 'shortid';

const MUTATION_UPDATE_JAWABAN = gql`
  mutation MUTATION_UPDATE_JAWABAN(
    $idSoalMahasiswa: String!
    $idJawaban: String!
    $idSoal: String!
    $jawaban: String!
  ) {
    updateSoalMahasiswa(
      where: { id: $idSoalMahasiswa }
      data: {
        jawaban: {
          upsert: {
            where: { pegangan: $idJawaban }
            create: { idSoal: $idSoal, jawaban: $jawaban, pegangan: $idJawaban }
            update: { jawaban: $jawaban }
          }
        }
      }
    ) {
      id
    }
  }
`;

const TampilkanSoal = props => {
  console.log(props, 'ini props tampilkan soal');
  const { pertanyaan, jawaban } = props.soal;

  const updateJawabanDb = (client, idJawaban, jawaban) => {
    const ngejawab = {
      idSoalMahasiswa: props.id,
      idSoal: props.soal.id,
      idJawaban,
      jawaban
    };
    console.log(ngejawab);
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
                      item ? item.jawaban.idJawaban === jawab.id : false
                    ).length
                      ? 'primary'
                      : 'danger'
                  }
                  onClick={async () => {
                    await updateJawabanDb(client, 'eree', 'd');
                    /*
                      prop dari jawaban
                        id
                        idSoal
                        idJawaban
                        jawaban
                        pegangan
                    */
                    props.menjawab({
                      soal: props.soal.id,
                      jawaban: { idJawaban: jawab.id, jawaban: jawab.title }
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
