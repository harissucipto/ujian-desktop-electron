import React from 'react';
import { Card, List, Avatar, Button, Input, Row, Col, message } from 'antd';
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
  const { pertanyaan, jawaban, image } = props.soal;

  const updateJawabanDb = async (client, idJawaban, pegangan) => {
    const ngejawab = {
      idSoalMahasiswa: props.id,
      idSoal: props.soal.id,
      ujian: props.ujian,
      idJawaban,
      pegangan
    };

    await client
      .mutate({
        mutation: UPDATE_JAWABAN,
        variables: ngejawab
      })
      .catch(() => message.error('Eror Tidak Bisa update Jawaban Koneksi'));
  };

  const findJawaban = props.jawaban.filter(
    item => item.idSoal === props.soal.id
  );
  const pegangan = findJawaban[0]
    ? findJawaban[0].pegangan || shortid()
    : shortid();
  console.log(pegangan, 'ini peganganku');

  return (
    <Card title="Tampilan Soal">
      <Row>
        {image && (
          <img
            src={`${image}?${Date.now()}`}
            width={200}
            alt="Gambar pertanyaan"
          />
        )}
      </Row>
      <Row>
        <div className="readonly-editor">
          <Editor
            toolbarHidden
            readOnly
            contentState={JSON.parse(pertanyaan)}
          />
        </div>
      </Row>

      <div style={{ marginTop: '20px' }}>
        {jawaban.map(jawab => (
          <div key={jawab.id}>
            <Row>
              <Col span={2}>
                <ApolloConsumer>
                  {client => (
                    <Button
                      type={
                        props.jawaban.filter(item =>
                          item !== null ? item.jawaban.id === jawab.id : false
                        ).length
                          ? 'primary'
                          : 'dashed'
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
              </Col>

              <Col span={22}>
                <Row>
                  {jawab.image && (
                    <img
                      src={`${jawab.image}?${Date.now()}`}
                      width={200}
                      alt="Gambar pertanyaan"
                    />
                  )}
                </Row>
                <div className="readonly-editor">
                  <Editor
                    toolbarHidden
                    readOnly
                    initialContentState={JSON.parse(jawab.content)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TampilkanSoal;
