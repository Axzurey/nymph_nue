import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import {  BsArrowRightCircleFill, BsFillFileEarmarkDiffFill } from "react-icons/bs";
import { colors } from "../client/global";
import { fileSEK } from "../client/muon";
import fs from 'fs'
import axios from 'axios'

interface inputProps extends React.PropsWithChildren {
    sendClicked: (text: string, payload: string[]) => void
}

function NueInput(props: inputProps) {

    const [value, setValue] = React.useState('');
    const [payload, setPayload] = React.useState([] as string[]);

    const textChanged = (event: { target: { value: React.SetStateAction<string>; }; }) => setValue(event.target.value);

    return (
        <Box pb='10' color={colors.secondaryColor}>
            <form onSubmit={async (e) => {
                e.preventDefault();
                props.sendClicked(value, payload);

                let formData = new FormData();
                
                payload.forEach(async (v) => {
                    let [pass, fileContent] = await fileSEK.getFileContent(v)

                    if (!pass) return;

                    formData.append('files[]', fileContent, v)
                })

                let res = await axios({
                    method: 'post',
                    url: 'http://localhost:7000/nuelink/sendmessage',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                console.log(res)
                setValue('')
            }}>
                <Flex>
                    <InputGroup>
                        <InputLeftElement>
                            <IconButton 
                                aria-label="file picker" 
                                icon={<BsFillFileEarmarkDiffFill/>}
                                background='transparent'
                                onClick={async () => {
                                    let [ok, filePaths] = await fileSEK.promptFileAcquisition();
                                    if (ok) {
                                        console.log('all good')
                                        console.log(filePaths)
                                        setPayload([...payload, ...filePaths]);
                                    }
                                    else {
                                        console.log('smth went wrong')
                                    }
                                }}
                            />
                        </InputLeftElement>
                        <Input 
                            value={value} 
                            onChange={textChanged}
                            placeholder='Say something (to yourself)'
                            maxWidth='99%'
                            minWidth='99%'
                        > 
                        </Input>
                    </InputGroup>
                    <Spacer maxWidth='1%'/>
                    <IconButton
                        type='submit'
                        aria-label="send message"
                        icon={<BsArrowRightCircleFill/>}
                    />
                     </Flex>
                </form>
        </Box>
    )
}

interface textItemProps extends messageComposition {
    content: string,
    payload: string[]
}

interface messageComposition {
    content: string,
    payload: string[]
}

export function NueTextItem(props: textItemProps) {
    
    let l = '';
    props.payload.forEach((v) => {
        l = l + v + ', '
    })

    return (
    <Box backgroundColor={colors.super} rounded='lg' width='fit-content' color={colors.secondaryColor} height='3vh' >
        {`${props.content} + ${l}`}
    </Box>
    )
}

export class NueLink extends React.Component {

    state = {
        messages: [] as messageComposition[]
    }

    componentDidUpdate() {
        console.log('upd')
        let linkScrl = document.getElementById("linkScroll")!;
        linkScrl.scrollTop = linkScrl.scrollHeight;
    }
    render() {
        return (
            <Flex justify='left' direction='column' width='100%' height='100%'>
                <VStack id='linkScroll' alignItems='start' width='100%' height='90%' overflowY='scroll'
                    spacing='1vh'
                    align='start'
                >
                    {
                        this.state.messages.map((v, i) => {
                            return (<NueTextItem 
                                payload={v.payload}
                                content={v.content} 
                            />)
                        })
                    }
                </VStack>
                <Spacer pb='4'/>
                <NueInput sendClicked={(text, payload) => {
                    let msgs = [...this.state.messages, {
                        payload: payload,
                        content: text
                    }]
                    this.setState({messages: msgs})
                    console.log(`button clicked, message: ${text}`)
                }}/>
            </Flex>
            );
    }
}