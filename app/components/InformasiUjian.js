import React from 'react';
import { Card, List, Avatar } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const INFO_UJIAN_QUERY = gql`
  query INFO_UJIAN_QUERY($id: String!, $jwt: String!) {
    infoUjian(id: $id, jwt: $jwt) {
      id
      nama
      dosen {
        id
        nama
      }
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
      kelas {
        id
        nama
        mataKuliah {
          id
          nama
        }
      }
      tanggalPelaksanaan
      lokasi
      JumlahSoal
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
          <Card title="Informasi Ujian ">
            <List>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Nama Ujian</a>}
                  description={infoUjian.nama}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Waktu Pelaksanaan</a>}
                  description={infoUjian.tanggalPelaksanaan}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Durasi Ujian</a>}
                  description={`${infoUjian.durasiPengerjaan} menit`}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Jurusan</a>}
                  description={infoUjian.prodi.jurusan.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Prodi</a>}
                  description={infoUjian.prodi.nama}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Dosen</a>}
                  description={infoUjian.dosen ? infoUjian.dosen.nama : '-'}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Kelas</a>}
                  description={`${infoUjian.kelas.nama}`}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a> Mata Kuliah</a>}
                  description={infoUjian.kelas.mataKuliah.nama}
                />
              </List.Item>

              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" />}
                  title={<a>Jumlah Soal</a>}
                  description={infoUjian.JumlahSoal}
                />
              </List.Item>
            </List>
          </Card>
        );
      }}
    </QueryInfoUjian>
  );
};

export default InformasiUjian;
