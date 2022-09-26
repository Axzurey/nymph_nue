import { Avatar, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import FocusLock from "react-focus-lock"
import React from "react";
import styled, { keyframes } from "styled-components";
import { RegistrationPage } from "./registerPage";

const gradient = keyframes`
{
	0% {
	background-position: 0 50%;
	}
	50% {
	background-position: 100% 50%;
	}
	100% {
	background-position: 0 50%;
	}
}`;

const AnimatedGradient = styled.div`
  animation: ${gradient} 60s ease-in-out infinite;
  background: linear-gradient(45deg, #005555, #111111, #00111f, #006277);
  background-size: 300%;
  background-clip: text;
  width: 100%;
  height: 100%;
`;

interface anchorProps extends React.PropsWithChildren {}

export function BackAnchor(props: anchorProps) {
    const {onOpen, onClose, isOpen} = useDisclosure()

    return (
        <AnimatedGradient>
            {props.children}
            
            <Popover 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement='left'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <Avatar cursor='pointer' pos='fixed' size='md' right="1vw" top='1vh'/>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <RegistrationPage/>
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </AnimatedGradient>
    )
}