import {
	Avatar,
	Box,
	Collapse,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Spacer,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import React, { useState } from "react";
import { IconType } from "react-icons/lib";

type tabT = {
	name: string, 
	map?: JSX.Element,
	children?: tabS[],
	icon?: IconType
}

type tabS = {
	name: string,
	map: JSX.Element,
	icon?: IconType
}

interface tabProps {
	children?: React.Component[],
	tabs: tabT[]
}

export default function Tabs(props: tabProps) {
	const sidebar = useDisclosure();
	const integrations = useDisclosure();
	const color = useColorModeValue("gray.600", "gray.300");

	const [currentTab, setCurrentTab] = useState(props.tabs[0]);

	console.log('rerender')

	const NavItem = (props: any) => {
		const { icon, children, ...rest } = props;
		return (
			<Flex
				align="center"
				px="4"
				pl="4"
				py="3"
				cursor="pointer"
				color="inherit"
				_dark={{ color: "gray.400" }}
				_hover={{
					bg: "gray.100",
					_dark: { bg: "gray.900" },
					color: "gray.900",
				}}
				role="group"
				fontWeight="semibold"
				transition=".15s ease"
				onClick={() => setCurrentTab(props.tab)}
				{...rest}
			>
				{icon && (
					<Icon
						mx="2"
						boxSize="4"
						_groupHover={{
							color: color,
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		);
	};

	const SidebarContent = (props: tabProps & any) => (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			zIndex="sticky"
			h="full"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg="white"
			_dark={{ bg: "gray.800" }}
			border
			color="inherit"
			borderRightWidth="1px"
			w="60"
			{...props}
		>
			<Flex px="4" py="5" align="center">
				<Text
					fontSize="2xl"
					ml="2"
					color="brand.500"
					_dark={{ color: "white" }}
					fontWeight="semibold"
				>
					Nue System ♥
				</Text>
			</Flex>
			<Flex
				direction="column"
				as="nav"
				fontSize="sm"
				color="gray.600"
				aria-label="Main Navigation"
			>
				{
					((props.tabs as tabT[]).map((v) => {
						if (v.children) {
							return (
							<>
								<NavItem tab={v} icon={v.icon} onClick={integrations.onToggle}>
									{v.name}
									<Icon
										as={MdKeyboardArrowRight}
										ml="auto"
										transform={integrations.isOpen ? "rotate(90deg)" : undefined}
									/>
								</NavItem>
								<Collapse in={integrations.isOpen}>
									{
										v.children.map((x) => {
											return (
												<NavItem icon={x.icon} pl="12" py="2" onClick={() => setCurrentTab(x)}>
													{x.name}
												</NavItem>
											)
										})
									}
								</Collapse>
							</>
							)
						}
						else {
							return (<NavItem tab={v} icon={v.icon}>{v.name}</NavItem>)
						}
					}))
				}
			</Flex>
		</Box>
	);
	
	return (
		<Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
			<SidebarContent tabs={props.tabs} display={{ base: "none", md: "unset" }} />
			<Drawer
				isOpen={sidebar.isOpen}
				onClose={sidebar.onClose}
				placement="left"
			>
				<DrawerOverlay />
				<DrawerContent>
					<SidebarContent tabs={props.tabs} w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: 60 }} transition=".3s ease">
				<Flex
					as="header"
					align="center"
					justify="space-between"
					w="full"
					px="4"
					bg="white"
					_dark={{ bg: "gray.800" }}
					borderBottomWidth="1px"
					color="inherit"
					h="14"
				>
					<IconButton
						aria-label="Menu"
						display={{ base: "inline-flex", md: "none" }}
						onClick={sidebar.onOpen}
						icon={<FiMenu />}
						size="sm"
					/>

					<Spacer w='96'></Spacer>

					<Flex align="center">
						<Icon color="gray.500" as={FaBell} cursor="pointer" />
						<Avatar
							ml="4"
							size="sm"
							bg="teal.500"
							src="src/imgs/tau.png"
							cursor="pointer"
						/>
					</Flex>
				</Flex>

				<Box as="main" p="4">
					{
						currentTab && currentTab.map
					}
				</Box>
			</Box>
		</Box>
	);
};
