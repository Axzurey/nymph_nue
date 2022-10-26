import { Box, Button, Center, chakra, HStack, Image, Popover, PopoverContent, shouldForwardProp, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import FocusLock from "react-focus-lock"
import { isValidMotionProp, motion } from "framer-motion"

enum PlaylistCreationState {
    PROMPT_TYPE,
    DETAILS,
    IMPORT,
    DONE
}

const ChakraDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop)
})

export function CreatePlaylistView() {

    const [creationState, setCreationState] = useState(PlaylistCreationState.PROMPT_TYPE)

    return (
        <>
            {
                creationState === PlaylistCreationState.PROMPT_TYPE ? <CreatePlaylistTypePrompt/> : undefined

            }
        </>
    )
}
//peek!
export function CreatePlaylistTypePrompt() {

    const {onOpen, onClose, isOpen} = useDisclosure()

    if (!isOpen) {
        onOpen();
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
                <HStack>
                    <Image>
                        
                    </Image>
                </HStack>
            </FocusLock>
        </ChakraDiv>
    )
}