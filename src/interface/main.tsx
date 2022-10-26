import { Box, Button } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { colors } from "../shared/theme";
import {BsCloudDownloadFill, BsFillPlusCircleFill, BsFolderFill} from 'react-icons/bs';
import styled, {keyframes} from "styled-components";
import { getLoadLilacAuth, requestClientCode } from "../server/lylacServer";
import { useEffect } from "react";
import { BackAnchor } from "./backAnchor";
import { CreatePlaylistView } from "../views/createPlaylistView";

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

export function MainInterface() {
	useEffect(() => {
		getLoadLilacAuth(
			'519486068354-0d7u2ddtk434kulffce9gatv16658epf.apps.googleusercontent.com',
			'https://www.googleapis.com/auth/youtube.readonly',
			'http://localhost:7000/lylac/gauth'
		)
	})
    return (
    <Box minW='100vw' minH='100vh' bg={colors.weaksuper}>
        <Sidebar 
		items={[
                {
                    text: 'Downloader',
                    view: <BackAnchor>
						<Button onClick={_ => requestClientCode()}>
							finna prompt the code
						</Button>
					</BackAnchor>,
                    icon: BsCloudDownloadFill
                },
                {
                    text: 'My Content',
                    view: <AnimatedGradient/>,
                    icon: BsFolderFill
                },
                {
                    text: 'Create Playlist',
                    view: <CreatePlaylistView/>, //popup!
                    icon: BsFillPlusCircleFill
                }
            ]}
		playlists={[
			{
				name: 'hello my world!',
				view:  <AnimatedGradient/>,
			},
			{
				name: 'playlist 2',
				view:  <AnimatedGradient/>,
			},
			{
				name: 'for the goats',
				view:  <AnimatedGradient/>,
			},
			{
				name: 'sad music :(',
				view:  <AnimatedGradient/>,
			}
		]}
		/>
    </Box>
    )
}