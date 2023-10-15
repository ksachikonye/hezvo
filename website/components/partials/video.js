"use client";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Card from "@/components/ui/Card";

const VideoPage = ({url, ...props}) => {
  return (
    <Card title="Video">
      <VideoPlayer url={url} />
    </Card>
  );
};

export default VideoPage;
