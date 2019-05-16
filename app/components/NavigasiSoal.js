import React from 'react';
import { Card, List, Avatar, Button, Row, Col } from 'antd';

const InformasiUjian = props => {
  const { tampilkan, navigasi, jawaban } = props;
  return (
    <Card title="Navigasi Soal Ujian">
      <Row gutter={12}>
        {props.soals.map((soal, i) => (
          <Col span={24 / 4} style={{ marginTop: '12px' }} key={i}>
            <Button
              key={soal.id}
              size="large"
              block
              type={
                tampilkan === soal.id
                  ? 'dashed'
                  : jawaban.filter(jawab => jawab.idSoal === soal.id).length
                  ? 'primary'
                  : 'danger'
              }
              onClick={() => navigasi(soal.id)}
            >
              {i + 1}
            </Button>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default InformasiUjian;
