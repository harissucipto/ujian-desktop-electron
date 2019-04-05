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
              ? 'default'
              : jawaban.filter(jawab => jawab.idSoal === soal.id).length
              ? 'danger'
              : 'primary'
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
