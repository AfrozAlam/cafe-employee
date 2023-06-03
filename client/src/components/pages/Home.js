import { Header } from '../styled/common';
import { Space, Card } from 'antd'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Header>Welcome to Cafe Employee Site !</Header>
      <Space direction="vertical" size={32} className='home-space'>
        <Card
          title="Cafe Page"
          extra={<a href="/cafe">Click</a>}
          style={{
            width: 300,
          }}
        >
          <p>please visit the Cafe Page</p>
          <LocalCafeOutlinedIcon />
          <p>'/cafe'</p>
        </Card>
        <Card
          size="small"
          title="Employee Page"
          extra={<a href="/employee">Click</a>}
          style={{
            width: 300,
          }}
        >
          <p>please visit the Employee Page</p>
          <BadgeOutlinedIcon />
          <p>'/employee'</p>
        </Card>
      </Space>
    </>
  )
}

export default Home