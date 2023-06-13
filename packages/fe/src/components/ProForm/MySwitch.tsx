import { Switch, SwitchProps } from 'antd'

type Props = SwitchProps & {
  value?: boolean
}

export default function MySwitch(props: Props) {
  return <Switch {...props} checked={props.value}></Switch>
}
