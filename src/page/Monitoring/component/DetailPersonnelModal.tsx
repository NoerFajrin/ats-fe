import { Col, Descriptions, Divider, Modal, Row, Space, Statistic, Typography } from 'antd';
import { LatLngExpression } from 'leaflet';
import React from 'react'

interface PersonelInterface {
    user: string;
    position: LatLngExpression;
    sensor_id: string;
    sensor_parameter: {
        body_temperature: number;
        spo2: number;
        heart_rate: number;
    };
    nama_penugasan: string;
}

interface DetailPersonnelModalProps {
    open: boolean;
    onClose: () => void;
    personnel: PersonelInterface
}
const DetailPersonnelModal = ({ open, onClose, personnel }: DetailPersonnelModalProps) => {
    const { user, sensor_id, sensor_parameter, nama_penugasan } = personnel
    const { body_temperature, spo2, heart_rate } = sensor_parameter
    return (
        <Modal open={open} onCancel={onClose}>
            <Typography.Text strong>Informasi Penugasan</Typography.Text>
            <Space style={{ width: '100%' }} direction='vertical' size={'large'}>
                <Descriptions size='middle' layout='vertical'>
                    <Descriptions.Item label={'Nama Petugas'}>{user}</Descriptions.Item>
                    <Descriptions.Item label={'Nama Kegiatan'}>{nama_penugasan}</Descriptions.Item>
                </Descriptions>
            </Space>
            <Divider />
            <Typography.Text strong>Monitoring Kesehatan</Typography.Text>
            <Space style={{ width: '100%' }} direction='vertical' size={'large'}>
                <Row gutter={12}>
                    <Col span={8}>
                        <Statistic title="Heart rate" value={heart_rate} suffix={' bpm'} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="SPO2" value={spo2} suffix={' %'} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Suhu Tubuh" value={body_temperature} suffix={' "C'} />
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}

export default DetailPersonnelModal