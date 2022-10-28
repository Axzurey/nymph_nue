import { Box, Button, Center, chakra, HStack, IconButton, Image, Popover, PopoverContent, shouldForwardProp, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react"
import FocusLock from "react-focus-lock"
import { isValidMotionProp, motion } from "framer-motion"
import { BsFolderFill } from "react-icons/bs"

enum PlaylistCreationState {
    PROMPT_TYPE,
    DETAILS,
    IMPORT,
    DONE
}

const ChakraDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop)
})

type CreationType = 'spotify' | 'file'

export function CreatePlaylistView() {

    const [creationState, setCreationState] = useState(PlaylistCreationState.PROMPT_TYPE);

    const [selectionOption, setSelectionOption] = useState('file' as CreationType);

    const onSelectOption = (option: CreationType) => {
        setSelectionOption(option);
        setCreationState(PlaylistCreationState.DETAILS)
    }

    return (
        <ChakraDiv
            width='100vw'
            height='100vh'
            position='fixed'
            left='0'
            top='0'
            backgroundColor='blackAlpha.800'
            initial={{
                scale: 0
            }}
            animate={{
                scale: 1
            }}
            transition={{
                duration: '.25'
            }}
        >
            <FocusLock returnFocus persistentFocus={false}>
                    <Center width='90vw' height='90vh'>
                        <ChakraDiv backgroundColor='blue.500'>
                            {
                                creationState === PlaylistCreationState.PROMPT_TYPE ?
                                <CreatePlaylistTypePrompt onSelectOption={(p) => {
                                    setSelectionOption(p);
                                    setCreationState(PlaylistCreationState.DETAILS)
                                }}></CreatePlaylistTypePrompt> 
                                :
                                creationState === PlaylistCreationState.DETAILS ?
                                <CreatePlaylistInformationPrompt onDone={() => {}}></CreatePlaylistInformationPrompt>
                                : undefined
                            }
                        </ChakraDiv>
                    </Center>
            </FocusLock>
        </ChakraDiv>
    )
}

function CreatePlaylistInformationPrompt(props: {onDone: () => void}) {

    return (
        <Button>
            hello worldo!
        </Button>
    )
}

function CreatePlaylistTypePrompt(props: {onSelectOption: (option: CreationType) => void}) {
    
    return (
        <HStack spacing='auto' pl='5vw' pr='5vw' pt='30vh'>
            <IconButton
                width='30vw'
                height='30vh'
                aria-label="import from spotify"
                background='transparent'
                icon={<Image src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png"></Image>}
                onClick={() => props.onSelectOption('spotify')}
            >

            </IconButton>
            <IconButton
                width='30vw'
                height='30vh'
                aria-label="import from system"
                background='transparent'
                icon={<Image src="https://static.thenounproject.com/png/729367-200.png"></Image>}
                onClick={() => props.onSelectOption('file')}
            >

            </IconButton>
        </HStack>
    )
}