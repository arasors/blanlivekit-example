import '@livekit/components-styles';
import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer, useTracks,

} from '@livekit/components-react';
import {Track} from "livekit-client";

const serverUrl = 'wss://livekit.deepbluework.com';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb29tX2lkIjoiMjVqLTU4di1hZiIsImlkZW50aXR5IjoiQXJhcyBBbGhhcyIsInJvbGUiOiJvcmdhbml6ZXIiLCJpYXQiOjE3MTUwNjgyNzEsImV4cCI6MTcxNTE1NDY3MX0.MC3nuwZx9aDC9TJNNy4CvVsSWg_8dcidVv_3QzWVR1Y';

export default function App() {
    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={serverUrl}
            // Use the default LiveKit theme for nice styles.
            data-lk-theme="default"
            style={{ height: '100vh' }}
        >
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
            <ControlBar />
        </LiveKitRoom>
    );
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}
