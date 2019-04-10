import React from 'react';
import { Card, List, Avatar, Button } from 'antd';

const InformasiUjian = props => {
  const { tampilkan, navigasi, jawaban } = props;
  return (
    <Card title="Navigasi Soal Ujian">
      {props.soals.map((soal, i) => (
        <Button
          key={soal.id}
          type={
            tampilkan === soal.id
              ? 'dashed'
              : jawaban.filter(jawab => jawab.idSoal === soal.id).length
              ? 'primary'
              : 'danger'
          }
          style={{ marginRight: '5px' }}
          onClick={() => navigasi(soal.id)}
        >
          {i + 1}
        </Button>
      ))}
    </Card>
  );
};

export default InformasiUjian;
