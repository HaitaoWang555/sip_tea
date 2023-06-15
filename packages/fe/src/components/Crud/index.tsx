import SearchForm, { Props as SearchFormProps } from '../SearchForm'
import AdvanceSearchForm, { Props as AdvanceSearchFormProps } from '../SearchForm/advanced'
import ProTable, { Props as ProTableProps } from '../ProTable'
import ProForm, { Props as ProFormProps } from '../ProForm'
import Dialog, { Props as DialogProps } from '../Dialog'
import Info from '../Info'

import { useContext, useEffect, useState } from 'react'
import { AxiosPromise } from 'axios'
import { ResponseBodyType } from '@/types/api'
import { FormInstance, message, Spin } from 'antd'
import { findObjValByDeepKey, formatOPtions } from '@/utils/components'
import { ApiContext } from '@/context/api-context'
import { ConvertInterfaceToDict, ProItem } from '@/types/components-utils'

import TableColumnActionRender, { ActionRenderProps } from './actionRender'
import OperatorTableRender from './operatorRender'

type Props<RecordType> = SearchFormProps &
  AdvanceSearchFormProps &
  ProTableProps<RecordType> &
  DialogProps &
  ProFormProps<RecordType> & {
    submit?: (params: ConvertInterfaceToDict<RecordType>) => AxiosPromise<ResponseBodyType<unknown>>
    info?: () => AxiosPromise<ResponseBodyType<ConvertInterfaceToDict<RecordType>>>
    del?: (params: RecordType) => AxiosPromise<ResponseBodyType<void>>
    formType?: string
    setFormType?: React.Dispatch<React.SetStateAction<string>>
    setFormParams?: React.Dispatch<React.SetStateAction<RecordType | undefined>>
    setQueryParams?: React.Dispatch<React.SetStateAction<Partial<RecordType>>>
    tableActionChild?: (params: ActionRenderProps<RecordType>) => JSX.Element
    operatorTableChild?: () => JSX.Element
    formChild?: React.ReactNode
    infoChild?: React.ReactNode
  }
function Crud<RecordType extends object>(props: Props<RecordType>) {
  const Api = useContext(ApiContext)

  const [searchBtnLoading, setSearchBtnLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [infoLoading, setInfoLoading] = useState(false)
  const [FormInstanceVal, setFormInstanceVal] = useState<FormInstance<unknown>>()

  function saveForm(form: FormInstance<unknown>) {
    setFormInstanceVal(form)
  }

  function dialogClose() {
    FormInstanceVal && FormInstanceVal.resetFields()
  }

  function searchDataCallBack(val?: boolean) {
    setSearchBtnLoading(Boolean(val))
  }

  function getTitle(type: string) {
    switch (type) {
      case 'add':
        return '新增' + props.title
      case 'edit':
        return '修改' + props.title
      case 'info':
        return props.title + '详情'

      default:
        return props.title
    }
  }

  function initInfo() {
    if (!props.info) return
    if (!props.formParams) return
    setInfoLoading(true)
    props
      .info()
      .then((res) => {
        if (props.formParams && props.setFormParams) {
          props.setFormParams(Object.assign({}, props.formParams, findObjValByDeepKey(res, Api.responseKey)))
        }
      })
      .finally(() => {
        setInfoLoading(false)
      })
  }

  function onSubmit(params: ConvertInterfaceToDict<RecordType>) {
    if (!props.submit) return
    setConfirmLoading(true)
    props
      .submit(Object.assign(props.formParams || {}, params))
      .then((res) => {
        props.onSearch(Object.assign({}, props.queryParams || {}))
        props.setFormParams && props.setFormParams(undefined)
        message.success(res.data.message)
      })
      .finally(() => {
        setConfirmLoading(false)
        props.setOpen && props.setOpen(false)
      })
  }

  function updateColumnListOption() {
    props.columnList
      .filter((i: ProItem) => i.optionMth)
      .forEach((c: ProItem, index: number) => {
        formatOPtions(Api.responseKey, c, index, props.updateColumnList)
      })
  }

  function formatTableAction(columnList: ProItem[]) {
    columnList.forEach((i) => {
      if (i.dataIndex === 'action') {
        i.tableRender = TableColumnActionRender({
          setFormType: props.setFormType,
          setOpen: props.setOpen,
          setFormParams: props.setFormParams,
          setQueryParams: props.setQueryParams,
          del: props.del,
          tableActionChild: props.tableActionChild,
        })
      }
    })
    return columnList
  }

  useEffect(() => {
    if (props.open && props.formType && props.formType !== 'add') {
      initInfo()
    }
    if (props.open && props.formType && ['add', 'edit'].includes(props.formType)) {
      updateColumnListOption()
    }
    if (!props.open) {
      props.setFormParams && props.setFormParams(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  return (
    <>
      {props.searchList ? (
        <AdvanceSearchForm
          columnList={props.columnList}
          searchBtnLoading={searchBtnLoading}
          onSearch={props.onSearch}
          labelWidth={props.labelWidth}
          searchList={props.searchList}
        />
      ) : (
        <SearchForm
          columnList={props.columnList}
          searchBtnLoading={searchBtnLoading}
          onSearch={props.onSearch}
          labelWidth={props.labelWidth}
        />
      )}

      <ProTable
        columnList={formatTableAction(props.columnList)}
        loadData={props.loadData}
        queryParams={props.queryParams}
        searchDataCallBack={searchDataCallBack}
        operatorRender={OperatorTableRender({
          setFormType: props.setFormType,
          setFormParams: props.setFormParams,
          setOpen: props.setOpen,
          operatorTableChild: props.operatorTableChild,
        })}
        tableProps={props.tableProps}
        style={{ marginTop: '24px' }}
      />
      {props.formType && (
        <Dialog
          width={props.width}
          open={props.open}
          title={getTitle(props.formType)}
          setOpen={props.setOpen}
          footer={null}
          afterClose={dialogClose}
          wrapClassName="proDialog"
        >
          <Spin spinning={infoLoading}>
            {props.formType === 'info' ? (
              <Info
                columnList={props.columnList}
                formValues={props.formParams}
                type="dialog"
                setOpen={props.setOpen}
                column={1}
              >
                {props.infoChild}
              </Info>
            ) : (
              <ProForm
                labelWidth={props.labelWidth}
                columnList={props.columnList}
                formParams={props.formParams}
                onSubmit={onSubmit}
                confirmLoading={confirmLoading}
                formType={props.formType}
                type="dialog"
                onRender={saveForm}
                updateColumnList={props.updateColumnList}
                setOpen={props.setOpen}
              >
                {props.formChild}
              </ProForm>
            )}
          </Spin>
        </Dialog>
      )}
    </>
  )
}

export default Crud
