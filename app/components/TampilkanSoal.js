import React from 'react';
import { Card, List, Avatar, Button, Input } from 'antd';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { ConvertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import shortid from 'shortid';

const UPDATE_JAWABAN = gql`
  mutation UPDATE_JAWABAN(
    $idSoalMahasiswa: ID!
    $idSoal: String!
    $idJawaban: ID!
    $pegangan: String!
    $ujian: ID!
  ) {
    updateSoalMahasiswa(
      data: {
        jawaban: {
          upsert: {
            where: { pegangan: $pegangan }
            create: {
              idSoal: $idSoal
              jawaban: { connect: { id: $idJawaban } }
              ujian: { connect: { id: $ujian } }
              pegangan: $pegangan
            }
            update: { jawaban: { connect: { id: $idJawaban } } }
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

  const updateJawabanDb = async (client, idJawaban, pegangan) => {
    const ngejawab = {
      idSoalMahasiswa: props.id,
      idSoal: props.soal.id,
      ujian: props.ujian,
      idJawaban,
      pegangan
    };

    console.log(ngejawab, 'ngejawab');
    await client.mutate({
      mutation: UPDATE_JAWABAN,
      variables: ngejawab
    });
  };

  const findJawaban = props.jawaban.filter(
    item => item.idSoal === props.soal.id
  );
  const pegangan = findJawaban[0]
    ? findJawaban[0].pegangan || shortid()
    : shortid();
  console.log(pegangan, 'ini peganganku');

  return (
    <Card title="Tampilkan Soal disini">
      <div className="readonly-editor">
        <Editor toolbarHidden readOnly contentState={JSON.parse(pertanyaan)} />
      </div>
      <div>
        <h3>Pilihan Jawaban</h3>
        {jawaban.map(jawab => (
          <div key={jawab.id}>
            <ApolloConsumer>
              {client => (
                <Button
                  type={
                    props.jawaban.filter(item =>
                      item !== null ? item.jawaban.id === jawab.id : false
                    ).length
                      ? 'primary'
                      : 'danger'
                  }
                  onClick={() => {
                    console.log(jawab.pegangan, 'dari jawaban');
                    updateJawabanDb(client, jawab.id, pegangan);
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
                      pegangan,
                      jawaban: { id: jawab.id, title: jawab.title }
                    });
                  }}
                >
                  {jawab.title}
                </Button>
              )}
            </ApolloConsumer>

            <div className="readonly-editor">
              <Editor
                toolbarHidden
                readOnly
                initialContentState={JSON.parse(jawab.content)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TampilkanSoal;
