import {Box, Button, Divider, Heading, useColorMode} from '@chakra-ui/react';

interface passedSettingArgs {
    toggleColorMode: () => void
}

const SettingIds = [
    {
        type: 'divider',
        text: 'Theming'
    },
    {
        type: 'button',
        onClick: (args: passedSettingArgs) => {args.toggleColorMode()},
        text: 'Toggle Theme (light | dark)'
    },
]

function NueSettings() {
    const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Box>
            {SettingIds.map((v) => {
                if (v.type === 'button') {
                    return (
                        <Button key={v.text} onClick={() => {
                            v.onClick!({toggleColorMode: toggleColorMode})
                        }}>
                            {v.text}
                        </Button>
                    )
                }
                else if (v.type === 'divider') {
                    return (
                        <>
                            <Divider/>
                            <Heading>
                                {v.text}
                            </Heading>
                            <Box height='5vh'></Box>
                        </>
                    )
                }
                return undefined
            })}
        </Box>
    )
}

export default NueSettings;