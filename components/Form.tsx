import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import * as React from 'react'
import SelectInput from '../components/SelectInput'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Post } from '../redux/reducers/FormReducer'
import read from '../services/read'
import Background from './Background'
import TextInput from './TextInput'


const typeData = ["Delivery", "Social Listening", "Mensajería"]

const flowData = [
    {
        type: 'Delivery',
        options: ["Completo", "Responde y atiende", "Atiende"]
    }, {
        type: 'Social Listening',
        options: ["Clasifica y responde", "Responde"]
    }, {
        type: 'Mensajería',
        options: ["Clasifica y responde", "Responde"]
    }
]

const responseData = [
    {
        flow: ['Completo', 'Clasifica y responde'],
        options: [],
        show: false,
    }, {
        flow: 'Responde y atiende',
        options: ["Deshabilitado", "Pedir datos y derivar", "Manejo automático"],
        show: true,
    }, {
        flow: 'Responde',
        options: ["Deshabilitado", "Clasificación automática"],
        show: true
    }, {
        flow: 'Atiende',
        options: [],
        show: false
    }
]

const Form = () => {
    const dispatch = useAppDispatch()
    const form = useAppSelector((state) => state.Form)

    const name = React.useRef<string>('')
    const type = React.useRef<string>('')
    const flow = React.useRef<string>('')
    const autoResponse = React.useRef<string>('')

    const [flowOptions, setFlowOptions] = React.useState<Array<string>>([])
    const [responseOptions, setResponseOptions] = React.useState<Array<string>>([])

    const [showAutoResponse, setShow] = React.useState<boolean>(false)

    const [clear, setClear] = React.useState<boolean>(true)

    const [timer, setTimer] = React.useState<boolean>(false)

    const handleName = React.useCallback(
        (value: string) => {
            name.current = value
        }, [])

    const handleType = React.useCallback(
        (value: string) => {
            type.current = value
            let options: Array<string> = []
            flowData.map((e) => {
                if (e.type == value)
                    options = [...e.options]
            })
            setFlowOptions(options)
            setShow(false)
        }, [])

    const handleFlow = React.useCallback(
        (value: string) => {
            flow.current = value
            let options: Array<string> = []
            responseData.map((e) => {
                if (e.flow == value) {
                    options = [...e.options]
                    setShow(e.show)
                }
            })
            setResponseOptions(options)
        }, [])

    const handleResponse = React.useCallback(
        (value: string) => {
            autoResponse.current = value
        }, [])

    const handlePost = () => {
        dispatch(
            Post({
                name: name.current,
                type: type.current,
                flow: flow.current,
                autoResponse: autoResponse.current
            })
        )
    }

    const handleClear = () => {
        setClear((prev) => !prev)
    }

    React.useEffect(() => {
        if (form.status == 'successfull') {
            handleClear()
            setTimer(true)
            let times = 0
            var interval = setInterval(() => {
                times += 1;
                // dev purposes show it finished
                // console.log(times) 
                if (times === 30) {
                    clearInterval(interval)
                    setTimer(false)
                }
            }, 100)
        }
        return () => clearInterval(interval)
    }, [form])

    React.useEffect(() => {
        //dev purposes show database on console
        read()
    }, [])

    return <>
        {
            timer && form.status == 'successfull' ?
                <Alert severity="success" sx={{ mb: 5 }}>
                    <AlertTitle>Exito</AlertTitle>
                    <strong>Se agrego correctamente</strong>
                </Alert> : <></>
        }
        {
            form.status == 'error' ?
                <Alert severity="warning" sx={{ mb: 5 }}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{form.msg}</strong>
                </Alert> : <></>
        }

        < Background minWidth={400} width={500} >
            <TextInput label={'Nombre de empresa'} clear={clear}
                onChange={handleName}
            />
            <SelectInput label='Tipo de empresa' options={typeData}
                onChange={handleType} clear={clear}
            />
            <SelectInput label='Flujo' options={flowOptions}
                onChange={handleFlow} clear={clear}
            />
            {showAutoResponse && <SelectInput label='Auto Respuesta' options={responseOptions}
                onChange={handleResponse} clear={clear}
            />}
            <Button variant="outlined" sx={{ float: 'right', m: 2 }} onClick={handlePost}>Enviar</Button>
            <Button variant="outlined" sx={{ float: 'left', m: 2 }} onClick={handleClear}>Limpiar</Button>
        </Background >
    </>
}

export default Form