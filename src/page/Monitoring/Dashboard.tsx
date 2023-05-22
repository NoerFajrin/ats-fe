import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import coordinates from '../../res/coordinates/coordinate'
import { LatLngExpression } from 'leaflet'
import SocketHelper from '../../helpers/socket'
import DetailPersonnelModal from './component/DetailPersonnelModal'
import { Card, FloatButton, Space, Tooltip, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { BarChartOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'

interface PersonelInterface {
    user: string;
    position: LatLngExpression;
    sensor_id: string;
    sensor_parameter: {
        body_temperature: number;
        spo2: number;
        heart_rate: number;
    }
    nama_penugasan: string
}
let arrayTemp: PersonelInterface[] = []
const Dashboard = () => {
    const navigation = useNavigate()
    // const [personnels, setPersonnels] = useState<PersonelInterface[]>([])
    const [personnels, setPersonnels] = useState<PersonelInterface[]>([])
    const [activePersonel, setActivePersonel] = useState<PersonelInterface | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false)
    useEffect(() => {
        const socket = SocketHelper.createConnection
        socket.on('connect', () => console.log('oit'))
        socket.on('oc-health-channel', (payload) => {
            // console.log(payload, 'msg arrived');
            const personnelFormat: PersonelInterface = {
                user: payload.fullname,
                position: [payload.lat, payload.lon],
                sensor_id: payload.sensor_id,
                sensor_parameter: {
                    body_temperature: payload.body_temperature,
                    spo2: payload.spo2,
                    heart_rate: payload.heart_rate
                },
                nama_penugasan: payload.nama_penugasan
            }

            handleNewConnection(personnelFormat)
        })
    }, [])

    const handleNewConnection = (personnel: PersonelInterface) => {
        // const isExist = personnels.findIndex((p) => p.user === personnel.user)
        // console.log(isExist, personnel.user);

        // if (isExist === -1) {
        //     setPersonnels([...personnels, personnel])
        // } else {
        //     if (activePersonel?.sensor_id === personnel.sensor_id) {
        //         setActivePersonel(personnel)
        //     }
        //     const newList = [...personnels]
        //     newList[isExist] = personnel
        //     setPersonnels(newList)
        // }
        
        
        const isArE = arrayTemp.findIndex((p) => p.user === personnel.user)
        if (isArE === -1) {
            arrayTemp = [...arrayTemp, personnel]
        } else {
            arrayTemp[isArE] = personnel
        }
        setPersonnels(arrayTemp)
        
        // dispatch(updateMarker(personnel))

    }

    const Personnel = ({ personnel }: { personnel: PersonelInterface }) => {
        return (
            <Marker position={personnel.position} eventHandlers={{
                click: () => {
                    setDetailModalOpen(true)
                    setActivePersonel(personnel)
                }
            }}>
            </Marker>
        )
    }
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* <Space style={{justifyContent:'space-between', width:'100%', padding:'10px 30px'}}>
                <Card style={{width:300}}>
                    <Typography>Konten</Typography>
                </Card>
                <Card style={{width:300}}>
                    <Typography>Konten</Typography>
                </Card>
                <Card style={{width:300}}>
                    <Typography>Konten</Typography>
                </Card>
                <Card style={{width:300}}>
                    <Typography>Konten</Typography>
                </Card>
            </Space> */}
            <MapContainer center={coordinates.indonesia as LatLngExpression} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {personnels.map((person) => <Personnel key={person.sensor_id} personnel={person} />)}
            </MapContainer>
            {
                activePersonel &&
                <DetailPersonnelModal personnel={activePersonel} open={detailModalOpen} onClose={() => setDetailModalOpen(false)} />
            }
            <FloatButton.Group style={{ zIndex: 400 }} trigger='hover' type='primary' >
                <Tooltip title={'Penugasan'} placement={'left'}>
                    <Link to={'/surat-tugas'}>
                        <FloatButton />
                    </Link>
                </Tooltip>
                <Tooltip title={'Statistic'} placement={'left'}>
                    <Link to={'/statistic'}>
                        <FloatButton icon={<BarChartOutlined />} />
                    </Link>
                </Tooltip>
            </FloatButton.Group>
        </div>
    )
}

export default Dashboard