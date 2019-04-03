import React from 'react';
import { Card, List, Avatar, Button, Input } from 'antd';

const TampilkanSoal = props => {
  console.log(props, 'ini props tampilkan soal');
  const { pertanyaan, jawaban } = props.soal;

  return (
    <Card title="Tampilkan Soal disini">
      <div>{pertanyaan}</div>
      <div>
        <h3>Pilihan Jawaban</h3>
        {jawaban.map(jawab => (
          <div key={jawab.id}>
            <Button
              type={
                props.jawaban.filter(item =>
                  item ? item.jawaban.id === jawab.id : false
                ).length
                  ? 'primary'
                  : 'danger'
              }
              onClick={() =>
                props.menjawab({
                  soal: props.soal.id,
                  jawaban: { id: jawab.id, title: jawab.title }
                })
              }
            >
              {jawab.title}
            </Button>
            <p>{jawab.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TampilkanSoal;
