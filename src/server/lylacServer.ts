//NOTE: PUT " <script src="https://accounts.google.com/gsi/client" async defer/> " IN YOUR MAIN HTML FILE!
//ALSO: " npm i @types/google.accounts @types/gapi"

let currentClient: google.accounts.oauth2.TokenClient | undefined = undefined;

export function getLoadLilacAuth(clientId: string, scopes: string, redirectUri: string, state?: string) {
    if (currentClient) return;

    gapi.load('client', () => {
        gapi.client.load('https://youtube.googleapis.com/$discovery/rest?version=v3').then(() => {

        }).catch((e) => {
            console.log(e)
        })
        
    })

    const client = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scopes,
        //redirect_uri: redirectUri,
       // ux_mode: 'popup',
        state: state,
        callback(response) {
            if (response && response.access_token) {
                
            }
        },
    })
    currentClient = client;

    return client;
}

interface youtubeVideoThumbnailProps {
    url: string
    width: number
    height: number
}

interface youtubeVideo {
    title: string
    description: string
    channelId: string
    channelName: string
    thumbnail: youtubeVideoThumbnailProps
    videoId: string
}

type youtubeSortOptions = 'relevance' | 'rating' | 'viewCount'

type youtubeThumbnailResolutionOptions = 'high' | 'standard'

export async function queryYoutubeData(
    q: string, 
    sort: youtubeSortOptions = 'relevance', 
    resolution: youtubeThumbnailResolutionOptions = 'high'):
        Promise<[true, youtubeVideo[]] | [false, number]> {

    let res = await gapi.client.youtube.search.list({
        'part': 'snippet',
        'q': q,
        'maxResults': 10,
        'safeSearch': 'none',
        'type': 'video',
        'order': sort
    })

    if (res.status === 200) {
        let fixed: youtubeVideo[] = res.result.items!.map((v) => {
            let r = v.snippet!.thumbnails![resolution]!;
            let x: youtubeVideo = {
                videoId: v.id!.videoId!,
                description: v.snippet!.description!,
                channelId: v.id!.channelId!,
                channelName: v.snippet!.channelTitle!,
                thumbnail: {
                    url: r.url!,
                    width: r.width!,
                    height: r.height!
                },
                title: v.snippet!.title!
            }
            return x;
        })
        return [true, fixed];
    }
    else {
        return [false, res.status!];
    }
    
}

export function requestClientCode() {
    if (!currentClient) throw new Error(`[lylac] A client has not been loaded yet!`);

    currentClient.requestAccessToken()
}