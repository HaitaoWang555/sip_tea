import { QuestionCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

function TooltipTitle({ title, tooltip }: { title: string; tooltip: string }) {
  return (
    <>
      {title}
      <span style={{ color: 'rgba(0, 0, 0, 0.45)', cursor: 'help', marginLeft: '4px' }}>
        <Tooltip title={tooltip}>
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    </>
  )
}

export default TooltipTitle
