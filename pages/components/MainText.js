import { Text, Row, Col } from '@nextui-org/react'

export default function MainText() {

return (
    <Row style={{ paddingTop: '10%', paddingBottom: '10%' }}>
        <Col>
        <Row justify='center' align='center'>
            <Text weight="bold" h1 transform='uppercase'>The <span style={{ color: '#ffa500' }}>Egg</span> Revolution is Here.</Text>
        </Row>
        <Row justify='center' align='center'>
            <Text weight="bold" h2>Why not be part with just a few Clicks?</Text>
        </Row>
        </Col>
    </Row>
)
}