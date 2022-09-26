import { Box, Button, Center, Divider, HStack, Icon, VStack } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { IconType } from "react-icons";
import { colors } from "../shared/theme";

interface sidebarItem {
    view: ReactElement,
    text: string,
    icon?: IconType
}

interface playlistItem {
    name: string,
    view: ReactElement
}

interface sidebarProps {
    items: sidebarItem[],
    playlists: playlistItem[]
}

export function Sidebar(props: sidebarProps) {
    const [currentSidebar, setCurrentsidebar] = useState({} as playlistItem | sidebarItem);

    return (
        <HStack spacing='0rem'>
            <VStack w='250px' h='100vh' bg={colors.super} align='stretch' spacing='0rem'>
                {
                    props.items.map((v, i) => {
                        return (
                            <>
                                <SidebarItem
                                    onclick={() => {
                                        setCurrentsidebar(v);
                                    }}
                                    text={v.text}
                                    active={currentSidebar === v}
                                    icon={v.icon}
                                />
                            </>
                        )
                    })
                }
                <Divider pt='8%'/>
                {
                    props.playlists.map((v) => {
                        return (
                            <SidebarItem 
                                    onclick={() => {
                                        setCurrentsidebar(v);
                                    }}
                                    text={v.name}
                                    active={currentSidebar === v}
                                />
                        )
                    })
                }
            </VStack>
            <Box h='100vh' w='full' bg='red.500'>
                {currentSidebar && currentSidebar.view}
            </Box>
        </HStack>
    )
}

interface sidebarItemProps extends React.PropsWithChildren {
    onclick: () => void,
    text: string,
    active: boolean,
    icon?: IconType
}

export function SidebarItem(props: sidebarItemProps) {
    return (
        <Center pl='-1rem' pt='1rem' w='100%' h='2.5rem'>
            <Button
                w='85%' 
                h='100%' 
                bg={props.active ? colors.primary : 'transparent'}
                _hover={{bg: props.active ? colors.hover : colors.weakhover}}
                onClick={props.onclick}
                leftIcon={props.icon && <Icon as={props.icon}/>}
                borderRadius='5px'
                justifyContent="left"
                >
                
                {props.text}
            </Button>
        </Center>
    )
}