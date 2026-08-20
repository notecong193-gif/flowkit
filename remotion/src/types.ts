export type FlowKitScene = {
  src: string;
  durationInSeconds: number;
  startFromSeconds?: number;
  volume?: number;
};

export type FlowKitVideoProps = {
  scenes: FlowKitScene[];
  fps?: number;
  width?: number;
  height?: number;
  transitionFrames?: number;
  backgroundColor?: string;
};

export const defaultProps: FlowKitVideoProps = {
  scenes: [],
  fps: 30,
  width: 1920,
  height: 1080,
  transitionFrames: 8,
  backgroundColor: '#000000',
};
