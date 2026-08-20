import React from 'react';
import {Composition} from 'remotion';
import {FlowKitVideo} from './FlowKitVideo';
import {defaultProps, FlowKitVideoProps} from './types';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FlowKitVideo"
      component={FlowKitVideo}
      defaultProps={defaultProps}
      durationInFrames={30}
      fps={30}
      width={1920}
      height={1080}
      calculateMetadata={({props}) => {
        const p = props as FlowKitVideoProps;
        const fps = p.fps ?? 30;
        return {
          fps,
          width: p.width ?? 1920,
          height: p.height ?? 1080,
          durationInFrames: Math.max(1, p.scenes.reduce((sum, scene) => sum + Math.max(1, Math.round(scene.durationInSeconds * fps)), 0)),
        };
      }}
    />
  );
};
