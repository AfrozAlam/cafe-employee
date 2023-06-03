import { Space, Card } from 'antd'
import HomeIcon from '@mui/icons-material/Home';

const PageNotFound = () => {
  return (
    <>
      <h1>404 ? Page Not Found</h1>
      <Space direction="vertical" size={32} className='home-space'>
        <Card
          title="Home Page"
          extra={<a href="/">Click</a>}
          style={{
            width: 300,
          }}
        >
          <p>please visit the Home Page</p>
          <HomeIcon />
          <p>'/'</p>
        </Card>
      </Space>
    </>
  )
}

export default PageNotFound