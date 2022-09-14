import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { colors } from "../../client/global";
import {motion} from 'framer-motion'

type tabT = {
	name: string,
	map: JSX.Element,
	icon?: IconType
}

const NavbarItem: React.FC<{tab: tabT}> = (props) => {

    return (
        <Tab _selected={{color: colors.primaryColor, bg: colors.backgroundColor}}>
            <motion.button whileHover ={{'rotate': -5} } >
                {props.tab.icon && (
					<Icon
						mx="2"
						boxSize="4"
						as={props.tab.icon}
					/>
				)}
                {props.tab.name}
            </motion.button>
        </Tab>
    )
}

const NavbarPanel: React.FC<{tab: tabT}> = (props) => {
    return (
        <TabPanel height='100%' bgColor={colors.super} overflow='hidden'>
                {props.tab.map}
        </TabPanel>
    )
}

export const Navbar: React.FC<{tabs: tabT[]}> = (props) => {

    return (
        <Tabs height='100vh' bgColor={colors.backgroundColor}>
            <TabList>
                {props.tabs.map((v, i) => {
                    return <NavbarItem key={i} tab={v}></NavbarItem>
                })}
            </TabList>
            <TabPanels height='100%'>
                {
                    props.tabs.map((v, i) => {
                        return <NavbarPanel key={i} tab={v}></NavbarPanel>
                    })
                }
            </TabPanels>
        </Tabs>
    )
}